import { Application } from "express";
import NotificationBotRoutes from "./Notification";
import UserRoutes from "./User";
import Project from "./Project";
import Organization from "./Organization";
import UserAssignRoutes from "./UserAssign";
import DocumentRoutes from './Document.routes'
import DocumentAssignmentRoutes from './DocumentAssignment/index';
import DocumentNameSettingRoutes from './Setting';
import CommunicationRoutes from './Communication';
import ReportRoutes from './Report';
import AuthenticationMiddleware from "../middlewares/Authentication";

let routes = (app: Application) => {
  UserRoutes(app);
  NotificationBotRoutes(app);
  Project(app);
  Organization(app);
  UserAssignRoutes(app);
  DocumentAssignmentRoutes(app);
  DocumentNameSettingRoutes(app);
  CommunicationRoutes(app);
  ReportRoutes(app);

  app.use("/api/document",
    AuthenticationMiddleware.authenticateHeader,
    DocumentRoutes);

};

export default routes;
