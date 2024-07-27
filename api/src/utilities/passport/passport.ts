import config from "config";
import passportJwt from "passport-jwt";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import UserService from "../../services/User/User.service";
import { User } from "../../models/User/User.model";

let security: { saltRound: number; secret: any; token_expiration: number } = {
  saltRound: 10,
  secret: "THIS_IS_THE_SECERT_KEY",
  token_expiration: 60 * 60 * 24 * 30,
};

let localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (username, password, done) => {
    UserService.findByEmail(username)
      .then((user: User) => {
        if (!user) {
          return done(null, false, {
            message: "Login Failed: Invalid Username or password!",
          });
        } else {
          bcrypt.compare(
            password,
            `${user.password}`,
            (error: any, isMatch: boolean) => {
              if (error) {
                return done(null, false, error);
              } else if (!isMatch) {
                return done(null, false, {
                  message: "Login Failed: Invalid Username or password!",
                });
              } else {
                return done(null, user.toJSON());
              }
            }
          );
        }
      })
      .catch((error: any) => {
        done(error);
      });
  }
);

let jwtStrategy = new passportJwt.Strategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: security.secret,
  },
  (jwtPayload, next) => {
    UserService.findByID(jwtPayload.id)
      .then((user) => {
        if (user) {
          next(null, user.toJSON());
        } else {
          next(null, false);
        }
      })
      .catch((error) => {
        return next(error, false);
      });
  }
);

export default { localStrategy, jwtStrategy, security };
