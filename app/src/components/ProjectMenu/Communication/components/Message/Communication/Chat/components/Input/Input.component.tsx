import {
  DeleteOutlined,
  FolderOpenOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Progress, Tooltip, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../../../constants/Constants";
import { CommunicationGroup } from "../../../../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { CommunicationMessage } from "../../../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";
import { ErrorHandler, getUserData } from "../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../common/Notification/Notification.component";
import { sendData } from "../../Chat.util";

const InputComponent: FC<{
  communication_messages: ApiCallState<CommunicationMessage[]>;
  selected_communication_group: CommunicationGroup;
  appendCommunicationMessage: Function;
}> = ({
  communication_messages,
  selected_communication_group,
  appendCommunicationMessage,
}) => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    const [textEntered, setTextEntered] = useState("");
    const [fileUploaded, setFileUploaded] = useState(false);
    const [file_uploaded_data, setFileUploadData] = useState({
      byte: 0,
      percent: 0,
    });

    const restForm = () => {
      form.resetFields();
      setTextEntered("");
      setFileUploaded(false);
      setFileUploadData({
        byte: 0,
        percent: 0,
      });
    };

    const onUploadProgress = (progressEvent: ProgressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent <= 100) {
        setFileUploadData({
          byte: loaded,
          percent,
        });
      }
    };

    const Submit = (values: any) => {
      if (values.text || values.file) {
        let formData = new FormData();

        if (values.text) formData.set("text", values.text);

        if (values.file) formData.set("file", values.file.file);

        formData.set(
          "communication_group_id",
          selected_communication_group.id.toString()
        );

        sendData(formData, onUploadProgress)
          .then((result) => {
            appendCommunicationMessage({ ...result.data, user: getUserData() });
            setLoading(false);
            restForm();
            OpenNotification(
              NotificationType.SUCCESS,
              "Message sent successfully!",
              ""
            );
          })
          .catch((error) => {
            setLoading(false);
            ErrorHandler(error).map((e: any) =>
              OpenNotification(
                NotificationType.ERROR,
                "Failed to send message",
                e.message
              )
            );
          });
      }
    };

    const FileUploadComponent = () => {
      if (fileUploaded) {
        return (
          <div
            style={{
              fontSize: 12,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Tooltip
              title={form.getFieldValue("file")?.file?.name}
              placement="top"
            >
              {/* <span style={{ color: "tomato" }}>Remove</span> */}
              <DeleteOutlined
                className="my-0"
                style={{
                  marginLeft: 3,
                  fontSize: 15,
                  color: "tomato",
                }}
                onClick={() => {
                  setFileUploaded(false);
                  form.setFieldsValue({
                    file: null,
                  });
                }}
              />
            </Tooltip>
          </div>
        );
      } else {
        return null;
        // return <span style={{ fontSize: 12, color: "black" }}>Attach</span>;
      }
    };

    return (
      <div>
        <Form form={form} onFinish={Submit}>
          <div
            style={{
              height: 70,
              paddingLeft: 10,
              paddingRight: 20,
            }}
            className="d-flex justify-content-between flex-row align-items-center"
          >
            {/* Text */}
            <div style={{ flexGrow: 1 }}>
              <Form.Item name="text" className="my-0">
                <Input.TextArea
                  style={{ resize: "none" }}
                  bordered={false}
                  rows={3}
                  placeholder="write a message ...."
                  onChange={(e: any) =>
                    e ? setTextEntered(e.target.value) : setTextEntered("")
                  }
                />
              </Form.Item>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center">
              {/* File */}
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: 60 }}
              >
                <Form.Item name="file">
                  <Upload
                    name="file"
                    beforeUpload={() => {
                      return false;
                    }}
                    type={"select"}
                    multiple={false}
                    maxCount={1}
                    onChange={(e: any) => setFileUploaded(true)}
                    onRemove={(e: any) => setFileUploaded(false)}
                    showUploadList={false}
                  >
                    {fileUploaded ? (
                      <FolderOpenOutlined
                        style={{
                          fontSize: 14,
                          color: "#6c757d",
                        }}
                      />
                    ) : (
                      <PaperClipOutlined
                        style={{
                          fontSize: 14,
                          color: "#6c757d",
                        }}
                      />
                    )}
                  </Upload>
                </Form.Item>

                <FileUploadComponent />
              </div>

              {/* Send */}
              <div className="">
                {communication_messages.isPending || loading ? (
                  <LoadingOutlined style={{ fontSize: 20 }} />
                ) : (
                  <Button
                    type="primary"
                    style={{ width: "32px", height: "32px" }}
                    disabled={textEntered !== "" || fileUploaded ? false : true}
                    icon={<SendOutlined />}
                    onClick={() => form.submit()}
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </Form>

        {/* File upload progress */}
        {fileUploaded && file_uploaded_data.percent > 0 && (
          <div className="mt-3 mr-5">
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={50}
              format={(percent: any) => `${percent}% uploaded`}
              status="active"
            />
          </div>
        )}
      </div>
    );
  };

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  communication_messages: state.communication_message.fetchPaged,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InputComponent);
