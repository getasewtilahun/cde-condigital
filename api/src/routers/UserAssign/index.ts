import { Application } from "express";
import UserAssignRoutes from "./UserAssign.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";
export default (app: Application) => {
    app.use(
        "/api/user-assign",
        AuthenticationMiddleware.authenticateHeader,
        UserAssignRoutes
    );
};
