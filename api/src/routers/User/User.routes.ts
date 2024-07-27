import express, { Router } from "express";
import UserController from "../../controllers/User/User.controller";
import passport from "passport";
import AuthenticationMiddleware from "../../middlewares/Authentication";

let router: Router = express.Router();

router
  /**
   * Create User
   */
  .post("/", UserController.create)

  /**
   * is a Valid user
   */
  .get("/isValid", UserController.isValid)

  /**
   * Find All User
   */
  .get("/", AuthenticationMiddleware.authenticateHeader, UserController.findAll)

  /**
   * Find All User by feature
   */
  .get(
    "/feature",
    AuthenticationMiddleware.authenticateHeader,
    UserController.findByFeature
  )

  /**
   * Find User By ID
   */
  .get(
    "/:id",
    AuthenticationMiddleware.authenticateHeader,
    UserController.findByID
  )

  /**
   * login
   */
  .post(
    "/login",
    AuthenticationMiddleware.authentication,
    AuthenticationMiddleware.generateAccessToken,
    AuthenticationMiddleware.response
  )

  .put(
    "/",
    AuthenticationMiddleware.authenticateHeader,
    UserController.updateUserOnly
  )

  .put(
    "/reset",
    AuthenticationMiddleware.authenticateHeader,
    UserController.resetPassword
  )

  /**
   * change password
   */
  .put(
    "/change-password",
    AuthenticationMiddleware.authenticateHeader,
    AuthenticationMiddleware.authenticateRole,
    UserController.updateUserPassword
  );

export default router;
