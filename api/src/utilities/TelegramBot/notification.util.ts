import config from "config";
import axios from "axios";

import { TELEGRAM_API, URI } from "./telegram.util";
import logger from "../loggers/winston";
import { TelegramAPIRequestType } from "../../constants/constants";

const TOKEN: string = config.get("telegram_bot.token");

const SERVER_URL = config.get("telegram_bot.serverUrl");

export const initNotificationBot = async () => {
  const WEBHOOK_URI = SERVER_URL + URI(TOKEN);
  await axios
    .get(
      `${TELEGRAM_API(TOKEN)}/${TelegramAPIRequestType.SET_WEBHOOK
      }?url=${WEBHOOK_URI}`
    )
    .then((res) => {
      logger.info("Notification telegram bot webhook set");
    })
    .catch((error) => {
      logger.error(`Failed to set notification telegram bot webhook, ${error}`);
    });
};

export const sendMessage = (
  chat_id: number,
  message: string,
  module: any = null
) => {
  return new Promise((resolve, reject) => {
    console.log({ message });
    if (chat_id && config.get("app.build") === "production")
      axios
        .post(`${TELEGRAM_API(TOKEN)}/${TelegramAPIRequestType.SEND_MESSAGE}`, {
          chat_id: chat_id,
          text: message,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          logger.error(`TELEGRAM ERROR ${JSON.stringify(error)}`);
          // reject(error);
          resolve(null);
        });
    else resolve(true);
  });
};
