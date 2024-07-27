import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddRFIPropType,
  consideredDocuments,
  sendData,
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

const AddRFIComponent: FC<AddRFIPropType> = ({
  users,
  project,
  document_assignment,
  fetchAllRequestForInformation,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consideredDocData, setConsideredDocData] = useState<Document[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      setConsideredDocData(consideredDocuments(document_assignment.payload));
    }
  }, [document_assignment, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("project_id", project.payload.id);
    formData.append("subject", value.subject);
    formData.append("description", value.description);
    formData.append("reference_no", value.reference_no);
    formData.append("considered_doc_id", value.considered_doc_id);
    formData.append("from", `${getUserData().id}`);
    formData.append("date", value.date.format("YYYY-MM-DD"));
    formData.append("assigned_to", value.assigned_to);
    formData.append("cc", `${value.cc}`);
    formData.append("status", "Pending");
    formData.append("file", value?.file?.file);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllRequestForInformation({
          project_id: project.payload.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed to save!", e.message)
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Request
      </Button>
      <Modal
        className="fixed-modal"
        width={1200}
        centered
        title="New Request For Information"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(),
          }}
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
                <Input.TextArea autoSize rows={2} />
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
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {consideredDocData.map((e, i) => (
                    <Select.Option key={i} value={e.id}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker allowClear={false} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="From">
                <Input
                  value={
                    users.payload.find((e) => e.id === getUserData().id)
                      ?.full_name
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Assigned To"
                name="assigned_to"
                rules={[{ required: true, message: "Assigned To Required!" }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
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
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
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
    fetchAllRequestForInformation: (action: any) =>
    dispatch(fetchAllRequestForInformation(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRFIComponent);
