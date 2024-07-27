import { Application } from "express";
import DocumentNameSettingRoutes from "./DocumentNameSetting.route";
import AuthenticationMiddleware from "../../middlewares/Authentication";

export default (app: Application) => {
    app.use(
        "/api/document-name-setting",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        DocumentNameSettingRoutes,
    );

};
