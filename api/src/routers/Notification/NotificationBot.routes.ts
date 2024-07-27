import express, { Router } from "express";
import NotificationBotController from "../../controllers/Notification/NotificationBot.controller";
import { URI } from "../../utilities/TelegramBot/telegram.util";
import config from "config";

let router: Router = express.Router();

router.post(
  URI(config.get("telegram_bot.token")),
  NotificationBotController.handleRequest
);

export default router;
