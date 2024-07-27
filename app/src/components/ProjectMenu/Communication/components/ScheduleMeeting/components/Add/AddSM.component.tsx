import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Upload,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { AddSMPropType, sendData } from "../../util/ScheduleMeeting.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllScheduleMeeting } from "../../../../../../../redux/ScheduleMeeting/ScheduleMeeting.action";
import { useLocation } from "react-router";

const AddSMComponent: FC<AddSMPropType> = ({
  project,
  users,
  fetchAllScheduleMeeting,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("project_id", project.payload.id.toString());
    formData.append("subject", value.subject);
    formData.append("date", value.date.format("YYYY-MM-DD"));
    formData.append("time", value.time.format("h:mm a"));
    formData.append("place", value.place);
    formData.append("scheduled_by", `${getUserData().id}`);
    formData.append("participants", `${value.participants}`);
    formData.append("ajenda", value.ajenda);
    formData.append("remark", value.remark);
    if (value.file) formData.append("file", value?.file?.file);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllScheduleMeeting({
          project_id: project.payload.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed to save", e.message)
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
        New Meeting
      </Button>
      <Modal
        className="fixed-modal"
        width={1200}
        centered
        title="New Meeting Schedule"
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
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker allowClear={false} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: "Please input Time" }]}
              >
                <TimePicker use12Hours format="h:mm a" allowClear={false} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Place"
                name="place"
                rules={[{ required: true, message: "Place Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Scheduled By">
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
                label="Participants"
                name="participants"
                rules={[{ required: false, message: "Participants Required!" }]}
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
                label="Ajenda"
                name="ajenda"
              // rules={[{ required: false, message: "Remark Required!" }]}
              >
                <Input.TextArea autoSize rows={2} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ required: false, message: "Remark Required!" }]}
              >
                <Input.TextArea autoSize rows={2} />
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllScheduleMeeting: (action: any) =>
    dispatch(fetchAllScheduleMeeting(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSMComponent);
