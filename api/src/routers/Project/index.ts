import { Application } from "express";
import ProjectRoutes from "./Project.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";
export default (app: Application) => {
  app.use(
    "/api/project",
    AuthenticationMiddleware.authenticateHeader,
    ProjectRoutes
  );
};
