import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  consideredDocuments,
  EditRFIPropType,
  answerForRequested,
} from "../../util/RequestForInformation.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { Document } from "../../../../../../../redux/Document/Document.type";
import moment from "moment";
import { fetchAllRequestForInformation } from "../../../../../../../redux/RequestForInformation/RequestForInformation.action";
import { useLocation } from "react-router";

const EditRFIComponent: FC<EditRFIPropType> = ({
  users,
  project,
  request_for_information,
  document_assignment,
  fetchAllRequestForInformation,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const location = useLocation();
  const path = location.pathname;
  const ProjectID = parseInt(path.split("/")[2]);

  useEffect(() => {
    if (isModalVisible && request_for_information && document_assignment) {
      // Initialize form fields with request_for_information data
      form.setFieldsValue({
        ...request_for_information, id: request_for_information.id,
        date: moment(request_for_information.date, "YYYY-MM-DD"),
        considered_doc_id: (request_for_information.considered_doc_id as unknown as string).split(",").map(item => item.trim()),
        cc: (request_for_information.cc as string).split(",").map(item => item.trim()),
      });
    }
  }, [isModalVisible, request_for_information, document_assignment, form]);

  console.log("request_for_information", request_for_information);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData: any = new FormData();
    formData.append("id", request_for_information.id.toString());
    formData.append("subject", value.subject);
    formData.append("description", value.description);
    formData.append("project_id", String(ProjectID));
    formData.append("reference_no", value.reference_no);
    formData.append("considered_doc_id", value.considered_doc_id.join(","));
    formData.append("from", `${getUserData().id}`);
    formData.append("date", value.date.format("YYYY-MM-DD"));
    formData.append("cc", value.cc.join(","));
    formData.append("status", "Pending");
    formData.append("file", value?.file?.file);

    answerForRequested(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllRequestForInformation();
        OpenNotification(NotificationType.SUCCESS, "Saved!", "");
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed to save!", e.message)
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        width={1200}
        centered
        title="Edit Request For Information"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Subject Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Description Required!" }]}
              >
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference No"
                name="reference_no"
                rules={[{ required: true, message: "Reference No Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Considered Doc IDs"
                name="considered_doc_id"
                rules={[
                  { required: true, message: "Considered Doc IDs Required!" },
                ]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {document_assignment.payload
                    .filter((doc: any) => doc.project_id === ProjectID)
                    .map((doc: any, i: number) =>
                      doc.DocumentStatuses.map((status: any, index: number) => (
                        <Select.Option key={`${i}_${index}`} value={`${doc.document_name}_${status.current_status}_${status.revision}`}>
                          {`${doc.document_name}_${status.current_status}_${status.revision}`}
                        </Select.Option>
                      ))
                    )}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="From">
                <Input
                  disabled
                  value={users.payload.find((e: any) => e.id === getUserData().id)?.full_name}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="CC"
                name="cc"
                rules={[{ required: true, message: "CC Required!" }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e: any, i: number) => (
                    <Select.Option key={`${i}_${Date.now()}`} value={e.full_name}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  defaultFileList={[{ uid: '-1', name: request_for_information.document.name, status: 'done', url: request_for_information.document.url }]}
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button className="btn-outline-secondary">
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  document_assignment: state.document_assignment.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllRequestForInformation: () => dispatch(fetchAllRequestForInformation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRFIComponent);
