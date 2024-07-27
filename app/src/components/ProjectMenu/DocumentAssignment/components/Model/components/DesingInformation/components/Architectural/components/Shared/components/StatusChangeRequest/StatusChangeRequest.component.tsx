import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { OpenNotification } from "../../../../../../../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../../../../../../../constants/Constants";
import { sendRequest, StatusChangeRequestPropType } from "../../util/Shared.util";
import { ErrorHandler } from "../../../../../../../../../../../../../utilities/utilities";
import { EditOutlined } from "@ant-design/icons";
import { fetchAllDocumentAssignment } from "../../../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";

interface OptionType {
  value: string;
  label: string;
}

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
  const [toOptions, setToOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const fromValue = document_assignment.DocumentStatuses?.[0]?.requested_status || document_assignment.DocumentStatuses?.[0]?.current_status || "";
    const actionStatus = document_assignment.DocumentStatuses?.[0]?.action_status || "";
    updateToOptions(fromValue, actionStatus);
    console.log("hellooooooooooooooooooo", fromValue, actionStatus);

  }, [document_assignment.DocumentStatuses]);


  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      id: document_assignment.DocumentStatuses[0].id,
      requested_status: value.to,
      current_status: value.from,
      action_status: "Pending",
      action_type: "Shared",
    };

    sendRequest(data)
      .then(() => {
        handleOk();
        fetchAllDocumentAssignment({
          project_id: project.payload.id,
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type: type,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Status change request sent!",
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to send status change request",
            e.message
          )
        );
      });
  };

  const updateToOptions = (fromValue: string, actionStatus: string) => {
    let options: OptionType[] = [];

    if (fromValue === 'S5' && ['Approved', 'Pending'].includes(actionStatus)) {
      options = [
        { value: 'A1', label: 'A1' },
        { value: 'A2', label: 'A2' },
        { value: 'A3', label: 'A3' },
        { value: 'A4', label: 'A4' },
        { value: 'A5', label: 'A5' },
        { value: 'B1', label: 'B1' },
        { value: 'B2', label: 'B2' },
        { value: 'B3', label: 'B3' },
        { value: 'B4', label: 'B4' },
        { value: 'B5', label: 'B5' },
      ];
    } else if (/^[AB]/.test(fromValue) && ['Rejected', 'Pending', 'Requested'].includes(actionStatus)) {
      options = [
        { value: 'A1', label: 'A1' },
        { value: 'A2', label: 'A2' },
        { value: 'A3', label: 'A3' },
        { value: 'A4', label: 'A4' },
        { value: 'A5', label: 'A5' },
        { value: 'B1', label: 'B1' },
        { value: 'B2', label: 'B2' },
        { value: 'B3', label: 'B3' },
        { value: 'B4', label: 'B4' },
        { value: 'B5', label: 'B5' },
      ];
    } else if (['S1', 'S2', 'S3', 'S4'].includes(fromValue) || ['Rejected', 'Pending', , 'Requested'].includes(actionStatus)) {
      options = [{ value: 'S5', label: 'S5' }];
    }

    setToOptions(options);
    form.setFieldsValue({ to: undefined });
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
        footer={
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>
        }
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="From">
                <Input
                  value={
                    document_assignment.DocumentStatuses?.[0]?.current_status || ''
                  }
                  disabled
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="To"
                name="to"
                rules={[{ required: true, message: "To Required!" }]}
              >
                <Select showSearch>
                  {toOptions.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
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
