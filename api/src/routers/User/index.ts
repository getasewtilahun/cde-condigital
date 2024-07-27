import { Application } from "express";
import UserRoutes from "./User.routes";
import UserLogRoutes from "./UserLog.routes";
import UserSeenRoutes from "./UserSeen.routes";
import UserRoleRoutes from "./UserRole.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";

export default (app: Application) => {
  app.use("/api/user", UserRoutes);
  app.use(
    "/api/user-seen",
    AuthenticationMiddleware.authenticateHeader,
    UserSeenRoutes
  );
  app.use(
    "/api/user-log",
    AuthenticationMiddleware.authenticateHeader,
    UserLogRoutes
  );
  app.use(
    "/api/user-role",
    AuthenticationMiddleware.authenticateHeader,
    UserRoleRoutes
  );
};
