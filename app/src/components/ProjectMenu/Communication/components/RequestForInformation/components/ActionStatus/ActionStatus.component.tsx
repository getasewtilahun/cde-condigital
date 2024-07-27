import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Popover, Select, Input, Upload, Form } from "antd";
import { NotificationType } from "../../../../../../../constants/Constants";
import { UploadOutlined, QuestionOutlined } from "@ant-design/icons";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { ActionStatusPropType, answerForRequested, answerRequested } from "../../util/RequestForInformation.util"; // Import both functions
import { MoreOutlined, CheckCircleOutlined, MessageOutlined, RedoOutlined } from "@ant-design/icons";
import { fetchAllRequestForInformation } from "../../../../../../../redux/RequestForInformation/RequestForInformation.action";
import { useLocation } from "react-router";
import { format } from 'date-fns';

const { Option } = Select;

const ActionStatusComponent: FC<ActionStatusPropType & { id: string }> = ({
  document_assignment,
  project,
  fetchAllRequestForInformation,
  category,
  folder,
  sub_folder,
  type,
  id,
  users // Assuming users is passed as a prop
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<'answer' | 'solved' | 'reopened' | null>(null);
  const [requestedStatus, setRequestedStatus] = useState<string>(''); // State for requested status
  const [selectedUserId, setSelectedUserId] = useState<string>(''); // State for selected user ID
  const [optionalComment, setOptionalComment] = useState<string>(''); // State for optional comment
  const [file, setFile] = useState<any>(null); // State for the uploaded file

  // Effect to update requestedStatus when document_assignment.DocumentStatuses changes
  useEffect(() => {
    const requestedStatus = document_assignment?.DocumentStatuses?.[0]?.requested_status || '';
    setRequestedStatus(requestedStatus);
  }, [document_assignment.DocumentStatuses]);

  const location = useLocation();
  const path = location.pathname;
  const project_id = parseInt(path.split("/")[2]);

  // Function to handle modal OK button click
  const handleModalOk = () => {
    if (!modalAction) return; // Guard clause if modalAction is not set

    const status = modalAction === 'answer' ? 'Answered' : modalAction === 'solved' ? 'Solved' : 'Reopened';
    const formattedDateTime = format(new Date(), 'yyyy-MM-dd HH:mm');

    // Prepare data object based on file existence
    let data;
    if (file) {
      // File exists, use answerForRequested with FormData
      const formData = new FormData();
      formData.append('id', id);
      formData.append('project_id', String(project_id));
      formData.append('status', status);
      formData.append('from', Number(selectedUserId).toString());
      formData.append('assigned_to', Number(selectedUserId).toString());
      formData.append('user_id', Number(selectedUserId).toString());
      formData.append('message', optionalComment);
      formData.append('file', file);
      formData.append('date', formattedDateTime);

      data = formData;
    } else {
      // File does not exist, use answerRequested with JSON object
      data = {
        id: String(id),
        project_id: String(project_id),
        status,
        from: Number(selectedUserId),
        assigned_to: Number(selectedUserId),
        user_id: Number(selectedUserId),
        message: optionalComment,
        date: formattedDateTime,
      };
    }

    // Call the appropriate function based on file existence
    setLoading(true); // Set loading state while processing
    const actionFunction = file ? answerForRequested : answerRequested;

    actionFunction(data) // Call the function with FormData or JSON
      .then(() => {
        setLoading(false); // Clear loading state on success
        fetchAllRequestForInformation({
          project_id: project.payload.id,
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type_on_status: requestedStatus,
        });
        OpenNotification(NotificationType.SUCCESS, `Request For Information ${status.toLowerCase()}!`, ""); // Notify success
      })
      .catch((error) => {
        setLoading(false); // Clear loading state on error
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            `Failed to ${status.toLowerCase()} request for information`,
            e.message
          )
        );
      });

    setModalVisible(false); // Hide modal after action
  };

  // Function to handle modal cancel button click
  const handleModalCancel = () => {
    setModalVisible(false); // Simply hide the modal
  };

  // Function to get actioner label based on modalAction
  const getActionerLabel = (requestedStatus: string) => {
    switch (modalAction) {
      case 'answer':
        return 'Answered By';
      case 'solved':
        return 'Solved By';
      case 'reopened':
        return 'Reopened By';
      default:
        return 'Actioner';
    }
  };

  // Function to handle file upload change
  const handleFileChange = (info: any) => {
    if (info.fileList.length > 1) {
      info.fileList = info.fileList.slice(-1);
    }
    setFile(info.fileList[0]?.originFileObj || null);
  };

  return (
    <>
      <Popover
        placement="leftTop"
        overlayClassName="action-popover"
        trigger="click"
        content={
          <div className="d-flex flex-column">
            <Button
              style={{ color: 'green' }}
              type="text"
              icon={<MessageOutlined />}
              onClick={() => {
                setModalAction('answer');
                setModalVisible(true);
              }}
            >
              Answer
            </Button>
            <Button
              style={{ color: 'green' }}
              type="text"
              icon={<CheckCircleOutlined />}
              onClick={() => {
                setModalAction('solved');
                setModalVisible(true);
              }}
            >
              Solved
            </Button>
            <Button
              type="text"
              icon={<RedoOutlined />}
              onClick={() => {
                setModalAction('reopened');
                setModalVisible(true);
              }}
            >
              Reopened
            </Button>
          </div>
        }
      >
        <Button
          icon={<MoreOutlined />}
          className="btn-outline-secondary border-0"
        >
          Action
        </Button>
      </Popover>

      <Modal
        title="Confirm Action"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
      >
        <Form.Item
          label={getActionerLabel(requestedStatus)}
          name="actioner"
          initialValue={selectedUserId}
          rules={[{ required: false, message: "Actioner Required!" }]}
        >
          <Select onChange={(value: any) => setSelectedUserId(value)}>
            {users.payload.map((user: any) => (
              <Option key={user.id} value={user.id}>
                {user.full_name} - {user.email}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Comment (optional)"
          name="comment"
        >
          <Input.TextArea
            rows={4}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOptionalComment(e.target.value)}
            value={optionalComment}
          />
        </Form.Item>
        <Form.Item
          label="File"
          rules={[{ message: "Please input File" }]}
          name="file"
        >
          <Upload
            name="file"
            beforeUpload={() => false}
            fileList={file ? [file] : []}
            onChange={handleFileChange}
            type="select"
            multiple={false}
            maxCount={1}
          >
            <Button className="btn-outline-secondary">
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchAllRequestForInformation: (action: any) =>
    dispatch(fetchAllRequestForInformation(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionStatusComponent);
