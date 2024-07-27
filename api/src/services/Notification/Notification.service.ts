import config from "config";
import sgMail from "@sendgrid/mail";
import async from "async";
import { UserService } from "../User";
import { User } from "../../models/User";
import { InternalServerError } from "../../errors/Errors";

class NotificationEmailService {
  public static sendEmail(payload: {
    user_id: number;
    subject: string;
    message: string;
  }) {
    return new Promise((resolve, reject) => {
      sgMail.setApiKey(config.get("app.sendGridApiKey"));
      async.waterfall(
        [
          (done: Function) => {
            UserService.findOne({ id: payload.user_id })
              .then((result) => {
                done(null, result);
              })
              .catch((error) => done(error));
          },
          (user: User, done: Function) => {
            sgMail.setApiKey(config.get("app.sendGridApiKey"));
            const msg: sgMail.MailDataRequired = {
              to: user.email,
              from: config.get("email.from"),
              subject: payload.subject,
              content: [{ type: "text/plain", value: payload.message }],
            };
            sgMail
              .send(msg)
              .then((res) => {
                console.log(res);
                done(null);
              })
              .catch((error) => {
                done(new InternalServerError(error));
              });
          },
        ],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

export default NotificationEmailService;
