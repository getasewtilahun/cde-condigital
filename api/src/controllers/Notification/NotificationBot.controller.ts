import evalidate from "evalidate";
import { Request, Response } from "express";
import { sendMessage } from "../../utilities/TelegramBot/notification.util";
import { NotificationBotService } from "../../services/Notification";

class NotificationBotController {
  /**
   * handle webhook requests
   *
   * @param {Request} request
   * @param {Response} response
   */
  static handleRequest(request: Request, response: Response) {
    const requestBody: { chat: { id: any }; text: string } = request.body
      .message
      ? request.body.message
      : request.body.edited_message;

    const data: { chat_id: any; text: string } = {
      chat_id: requestBody.chat.id,
      text: requestBody.text,
    };

    const schema = new evalidate.schema({
      chat_id: evalidate.number().required(),
      text: evalidate.string().required(),
    });

    const result = schema.validate(data);

    if (result.isValid) {
      if (data.text === "/start") {
        sendMessage(
          data.chat_id,
          "Welcome to ConDigital Notification Bot.\n\n To activate notification, enter bot activation key provided for you \n\n /verify_<key> \n\n Example /verify_j1h7 "
        );
      } else if (data.text.startsWith("/verify")) {
        if (data.text.split("_").length === 2) {
          const activationKey = data.text.split("/verify")[1];

          NotificationBotService.verify(activationKey, data.chat_id)
            .then((res) => {
              sendMessage(
                data.chat_id,
                "Account activated!! \n\nYou will recieve notifications when you have any"
              );
            })
            .catch((error) => {
              sendMessage(data.chat_id, "Failed to activate");
            });
        } else {
          sendMessage(
            data.chat_id,
            "To activate bot use the format \n\n /verify_<key> \n\n Example /verify_j1h7"
          );
        }
      } else {
        sendMessage(data.chat_id, "Help command \n\n /help");
      }
    } else {
      sendMessage(data.chat_id, "Invalid");
    }

    return response.send();
  }
}

export default NotificationBotController;
