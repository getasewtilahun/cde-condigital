import config from "config";
import axios from "axios";
import logger from "../loggers/winston";
import { AFRO_SMS_API } from "./AfroSms.util";

const TOKEN: string = config.get("afro_sms.token");
const FORM: string = config.get("afro_sms.from");
const SENDER: string = config.get("afro_sms.sender");
const CALLBACK: string = config.get("afro_sms.callback");

export const sendMessage = (to: string, message: string, bulk = false) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${AFRO_SMS_API()}`,
        {
          from: FORM,
          sender: SENDER,
          to,
          message,
          ps: "",
          // callback: CALLBACK,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
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
