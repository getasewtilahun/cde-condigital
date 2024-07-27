import {
  ArrowDownOutlined,
  FileOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popover, Typography } from "antd";
import moment from "moment";
import { FC, memo } from "react";
import { CommunicationMessage } from "../../../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { getInitials, getUserData } from "../../../../../../../../../utilities/utilities";
import { DownloadFile } from "../../Chat.util";
import DocumentViewerComponent from "./ViewDoc";

const MessageComponent: FC<{ message: CommunicationMessage }> = ({
  message,
}) => {
  const getStyle = () => {
    if (getUserData()?.id === message?.user_id) {
      return { color: "#f7f7f7", align: "end" };
    } else {
      return { color: "#cbe2f9", align: "start" };
    }
  };

  const getFileName = (url: string) => {
    let split = url.split("-");

    return split.slice(1, split.join("-").length).join("-") ?? "File";
  };

  const FileComponent = () => {
    return (
      <>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div
            style={{
              padding: "2px",
              backgroundColor: "rgb(108 117 125 / 30%)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              textAlignLast: "center",
            }}
          >
            <FileOutlined
              style={{
                fontSize: 20,
                color: "white",
              }}
            />
          </div>

          <Typography.Text
            className="px-3"
            ellipsis={true}
            style={{ fontSize: 12, color: "black", maxWidth: "300px" }}
          >
            {getFileName(message.document_url)}
          </Typography.Text>

          <Button
            type="text"
            icon={<ArrowDownOutlined />}
            onClick={() => (message.document_url ? DownloadFile(message) : "")}
          ></Button>

          <DocumentViewerComponent document={{ url: message.document_url }} />
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        margin: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: getStyle().align,
      }}
    >
      {getUserData()?.id !== message?.user_id && (
        <Avatar
          style={{
            backgroundColor: getStyle().color,
            color: "black",
          }}
          size={40}
        >
          {getInitials(message.user.full_name)}{" "}
        </Avatar>
      )}

      <div className="d-flex flex-column">
        <div
          style={{
            maxWidth: 500,
            marginLeft: 10,
            backgroundColor: getStyle().color,
            borderRadius: 10,
            padding: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {message.document_url && <FileComponent />}

          <p
            style={{
              wordWrap: "break-word",
              maxWidth: "400px",
              marginBottom: "0",
            }}
          >
            {message.text}
          </p>
        </div>
        <div
          style={{
            paddingLeft: "10px",
            paddingBottom: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: getStyle().align,
          }}
        >
          <span className="text-grey" style={{ fontSize: "11px" }}>
            {message?.user?.full_name} ,
          </span>
          <span
            className="text-grey"
            style={{ float: "right", fontSize: 11, marginLeft: "3px" }}
          >
            {moment(message.createdAt).format("MMM DD, hh:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageComponent);
