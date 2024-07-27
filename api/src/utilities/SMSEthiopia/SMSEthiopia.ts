import config from "config";
import axios from "axios";
import logger from "../loggers/winston";
import { GEEZ_SMS_API } from "./SMSEthiopia.util";

const token: string = config.get("geez_sms.token");
export const sendMessage = (to: string, text: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        GEEZ_SMS_API +
          `?token=${token}&phone=${to}&msg=${text}&shortcode_id=213`
      )
      .then((res) => {
        logger.info(`SMS to - ${to}`);
        logger.info(`SMS sent - ${JSON.stringify(res?.data)}`);
        resolve(res);
      })
      .catch((error) => {
        console.log("SMS ERROR: ", error);
        reject(error);
      });
  });
};
