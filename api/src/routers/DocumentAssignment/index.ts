import { Application } from "express";
import DocumentAssignmentRoutes from "./DocumentAssignment.routes";
import DocumentStatusRoutes from "./DocumentStatus.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";

export default (app: Application) => {
    app.use(
        "/api/document-assignment",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        DocumentAssignmentRoutes,
    );
    app.use(
        "/api/document-status",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        DocumentStatusRoutes,
    );

};
