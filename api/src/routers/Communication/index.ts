import { Application } from "express";
import RequestForInformationRoutes from "../Communication/RequestForInformation.routes";
import RequestForInformationStatusRoutes from "../Communication/RequestForInformationStatus.routes";
import AuthenticationMiddleware from "../../middlewares/Authentication";
import ScheduleMeetingRoutes from "./ScheduleMeeting.routes";
import MessageRoutes from "./Message.routes";
import CommunicationGroupRoutes from "./CommunicationGroup.routes";
import CommunicationMessageRoutes from "./CommunicationMessage.routes";

export default (app: Application) => {
    app.use(
        "/api/request-for-information",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        RequestForInformationRoutes,
    );
    app.use(
        "/api/request-for-information-status",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        RequestForInformationStatusRoutes,
    );
    app.use(
        "/api/schedule-meeting",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        ScheduleMeetingRoutes,
    );
    app.use(
        "/api/message",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        MessageRoutes,
    );
    app.use(
        "/api/communication-group",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        CommunicationGroupRoutes
    );

    app.use(
        "/api/communication-message",
        AuthenticationMiddleware.authenticateHeader,
        AuthenticationMiddleware.authenticateRole,
        CommunicationMessageRoutes
    );

};
