import { Application } from "express";
import OrganizationRoutes from "./Organization.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";
export default (app: Application) => {
  app.use(
    "/api/organization",
    AuthenticationMiddleware.authenticateHeader,
    OrganizationRoutes
  );
};
