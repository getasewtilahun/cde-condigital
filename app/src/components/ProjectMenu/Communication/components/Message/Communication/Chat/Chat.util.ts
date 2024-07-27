import axios from "axios";
import { Message, NotificationType } from "../../../../../../../constants/Constants";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { CommunicationMessage } from "../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";

export type ChatPropType = {
  selectedCommunicationGroupAction: any;
  loadedMessagesAction: any;
  fetchData: Function;
  closeGroup: Function;
};

export const sendData = (
  data: any,
  onUploadProgress: (event: ProgressEvent) => void
) =>
  axios.post(API_BASE_URI + "/communication-message", data, {
    onUploadProgress,
  });

export const Download = (id: any) =>
  axios.get(API_BASE_URI + `/communication-message/download/${id}`, {
    responseType: "blob",
  });

export const DownloadFile = (message: CommunicationMessage) => {
  Download(message.id)
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE variant
        window.navigator.msSaveOrOpenBlob(
          new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          message.document_url?.split("-")[1]
        );
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          message.document_url
            ?.split("-")
            ?.filter((e: any, index: any) => index > 0)
            ?.join("-")
        );
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      }
    })
    .catch((error) => {
      OpenNotification(
        NotificationType.ERROR,
        Message.DOCUMENT_DOWNLOAD_FAILED,
        ""
      );
    });
};
