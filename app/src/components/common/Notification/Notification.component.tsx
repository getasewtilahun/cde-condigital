import { notification } from "antd";
import { NotificationType } from "../../../constants/Constants";
export const OpenNotification = (
  type: string,
  message: string,
  description?: string
) => {
  notification.config({
    duration: 5,
  });

  switch (type) {
    case NotificationType.SUCCESS:
      return notification.success({
        message: message,
        description: description,
      });
    case NotificationType.ERROR:
      return notification.error({
        message: message,
        description: description,
      });
    case NotificationType.WARRING:
      return notification.warn({
        message: message,
        description: description,
      });
    case NotificationType.INFO:
      return notification.info({
        message: message,
        description: description,
      });
  }
};
