import {
  ArrowDownOutlined,
  FileOutlined,
  FolderOpenOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Popover, Typography } from "antd";
import moment from "moment";
import { FC, memo } from "react";
import { CommunicationMessage } from "../../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { getInitials, getUserData } from "../../../../../../../../utilities/utilities";
import { DownloadFile } from "../../Chat/Chat.util";
import DocumentViewerComponent from "../../Chat/components/Message/ViewDoc";

const ResultMessageComponent: FC<{ message: CommunicationMessage }> = ({
  message,
}) => {
  const getStyle = () => {
    return { color: "#f7f7f7", align: "end" };
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

          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <Button
                  type="text"
                  // icon={<ArrowDownOutlined style={{ color: "white" }} />}
                  onClick={() =>
                    message.document_url ? DownloadFile(message) : ""
                  }
                >
                  Download
                </Button>

                <DocumentViewerComponent
                  document={{ url: message.document_url }}
                />
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="border-0"
              style={{ backgroundColor: "transparent", color: "black" }}
            ></Button>
          </Popover>
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
      <Avatar
        style={{
          backgroundColor: getStyle().color,
          color: "black",
        }}
        size={40}
      >
        {getInitials(message.user.full_name)}{" "}
      </Avatar>

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

export default memo(ResultMessageComponent);
