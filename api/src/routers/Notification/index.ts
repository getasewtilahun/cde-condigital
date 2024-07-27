import { Application } from "express";
import NotificationBotRoutes from "./NotificationBot.routes";
export default (app: Application) => {
  app.use("/api", NotificationBotRoutes);
};
