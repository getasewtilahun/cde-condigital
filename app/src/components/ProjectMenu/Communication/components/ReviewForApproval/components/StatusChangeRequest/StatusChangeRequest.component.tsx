import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { approvedData, StatusChangeRequestPropType } from "../../util/ReviewForApproval.util";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { EditOutlined } from "@ant-design/icons";
import { fetchAllDocumentAssignment } from "../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";

const StatusChangeRequestComponent: FC<StatusChangeRequestPropType> = ({
  document_assignment,
  users,
  project,
  fetchAllDocumentAssignment,
  category,
  folder,
  sub_folder,
  type
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      id: document_assignment.id,
      action_by: value.action_by,
      status: value.to,
    };
    approvedData(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllDocumentAssignment({
          project_id: project.payload.id,
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type: type,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Status change request send!!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to send status changed request",
            e.message
          )
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
        Change Request
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={900}
        title="Status Change Request"
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
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="From">
                <Input value={document_assignment.status} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="To"
                name="to"
                rules={[{ required: false, message: "To Required!" }]}
              >
                <Select showSearch>
                  <Select.Option value={"S1"}>S1</Select.Option>
                  <Select.Option value={"S2"}>S2</Select.Option>
                  <Select.Option value={"S3"}>S3</Select.Option>
                  <Select.Option value={"S4"}>S4</Select.Option>
                  <Select.Option value={"S5"}>S5</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Action By"
                name="action_by"
                rules={[{ required: false, message: "Action By Required!" }]}
              >
                <Select showSearch>
                  {users.payload.map((e, i) => (
                    <Select.Option
                      key={i + Date.now() + 50}
                      value={e.id}
                    >
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
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
  users: state.user.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllDocumentAssignment: (action: any) => dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusChangeRequestComponent);
