import { Application } from "express";
import ReportRoutes from "../Report/Report.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";

export default (app: Application) => {
    app.use(
        "/api/report",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        ReportRoutes,
    );

};
