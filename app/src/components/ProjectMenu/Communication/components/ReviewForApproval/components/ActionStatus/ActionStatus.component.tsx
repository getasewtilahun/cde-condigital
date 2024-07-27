import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Popover, Select, Input } from "antd";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllDocumentAssignment } from "../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import {
  ErrorHandler, getUserData,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { ActionStatusPropType, approveRequest } from "../../util/ReviewForApproval.util";
import { MoreOutlined, CheckOutlined, CloseOutlined, QuestionOutlined, EditOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { AnyPtrRecord } from "dns";

const { Option } = Select;

const ActionStatusComponent: FC<ActionStatusPropType> = ({
  document_assignment,
  project,
  fetchAllDocumentAssignment,
  category,
  folder,
  sub_folder,
  type,
  users // Assuming users is passed as a prop
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject' | 'clarification' | null>(null);
  const [requestedStatus, setRequestedStatus] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [typeOnStatus, setTypeOnStatus] = useState<string>('');
  const [optionalComment, setOptionalComment] = useState<string>('');
  const [actioner, setActioner] = useState<'Approved By' | 'Rejected By' | 'Requested By' | ''>(''); // State for actioner
  const [selectedUser, setSelectedUser] = useState<any>(null); // State to hold the selected user's information

  useEffect(() => {
    const requested_status = document_assignment.DocumentStatuses && document_assignment.DocumentStatuses[0] && document_assignment.DocumentStatuses[0].requested_status
      ? document_assignment.DocumentStatuses[0].requested_status
      : '';
    const type_on_status = document_assignment.DocumentStatuses && document_assignment.DocumentStatuses[0] && document_assignment.DocumentStatuses[0].type_on_status
      ? document_assignment.DocumentStatuses[0].type_on_status
      : '';

    setRequestedStatus(requested_status);
    setTypeOnStatus(type_on_status);
  }, [document_assignment.DocumentStatuses]);

  // Fetch user info based on selectedUserId when it changes
  useEffect(() => {
    if (selectedUserId) {
      const user = users.payload.find((user: any) => user.id === selectedUserId);
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  }, [selectedUserId, users.payload]);

  const handleModalOk = () => {
    if (modalAction === 'approve') {
      onApprove(document_assignment.DocumentStatuses[0].id, "", requestedStatus, selectedUserId, optionalComment, actioner); // Pass actioner
    } else if (modalAction === 'reject') {
      onReject(document_assignment.DocumentStatuses[0].id, "", requestedStatus, selectedUserId, optionalComment, actioner); // Pass actioner
    } else if (modalAction === 'clarification') {
      onClarificationRequest(document_assignment.DocumentStatuses[0].id, "", requestedStatus, selectedUserId, optionalComment, actioner); // Pass actioner
    }
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  type Datas = {
    id: number;
    type_on_status?: string;
    action_status: string;
    approved_by?: any;
    rejected_by?: any;
    requested_by?: any;
    current_status?: any;
    requested_status?: any;
    revision?: any;
    authorized_by?: any;
    accepted_by?: any;
    comment?: string;
  };

  const onApprove = (id: number, type_on_status: string, requested_status: string, approved_by: any, comment: string, actioner: string) => {
    setLoading(true);

    let datas: Datas = {
      id: id,
      action_status: 'Approved',
      approved_by: approved_by, // Set approved_by in the datas object
      comment: comment
    };

    if (requested_status === 'S5') {
      // datas.type_on_status = "Shared";
      datas.authorized_by = `${getUserData().id}`;

      // datas.current_status = requested_status;
      // datas.requested_status = '';
    } else if (requested_status.startsWith('A') || requested_status.startsWith('B')) {
      datas.type_on_status = "Published";
      datas.accepted_by = `${getUserData().id}`;
      datas.current_status = requested_status;
      datas.requested_status = '';
      datas.revision = 'C01';
    } else {
      datas.type_on_status = "Shared";
      datas.approved_by = `${getUserData().id}`;
      datas.current_status = requested_status;
    }

    approveRequest(datas)
      .then(() => {
        setLoading(false);
        fetchAllDocumentAssignment({
          project_id: project.payload.id,
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type_on_status: type_on_status,
        });
        OpenNotification(NotificationType.SUCCESS, "Document approved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to approve document",
            e.message
          )
        );
      });
  };

  const onReject = (id: number | string, type: string, requested_status: string, rejected_by: any, comment: string, actioner: string) => {
    setLoading(true);
    const paramName = setApprovedByParam(requested_status);
    const datas = {
      id: String(id),
      action_status: 'Rejected',
      [paramName]: rejected_by,
      comment: comment,
    };

    approveRequest(datas)
      .then(() => {
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
          "Document rejected!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to reject document",
            e.message
          )
        );
      });
  };

  const setApprovedByParam = (requested_status: string) => {
    if (requested_status === 'S5') {
      return 'authorized_by';
    } else if (requested_status.startsWith('A') || requested_status.startsWith('B')) {
      return 'accepted_by';
    } else {
      return 'approved_by';
    }
  };
  const onClarificationRequest = (id: number | string, type: string, requested_status: string, requested_by: any, comment: string, actioner: string) => {
    setLoading(true);
    const datas = {
      id: String(id),
      action_status: 'Requested',
      requested_by: requested_by,
      comment: comment,
    };

    approveRequest(datas)
      .then(() => {
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
          "Clarification request sent!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to send clarification request",
            e.message
          )
        );
      });
  };

  const getApproveButtonLabel = (requestedStatus: string) => {
    if (requestedStatus.startsWith('A') || requestedStatus.startsWith('B')) {
      return 'Accept';
    } else if (requestedStatus === 'S5') {
      return 'Authorize';
    } else {
      return 'Approve';
    }
  };

  const getActionerLabel = (requestedStatus: string) => {
    if (modalAction === 'reject') {
      return 'Rejected By';
    } else if (modalAction === 'clarification') {
      return 'Requested By';
    } else if (requestedStatus.startsWith('A') || requestedStatus.startsWith('B')) {
      return 'Accepted By';
    } else if (requestedStatus === 'S5') {
      return 'Authorized By';
    } else if (requestedStatus.startsWith('S')) {
      return 'Approved By';
    } else {
      return 'Actioner';
    }
  };


  return (
    <>
      <Popover placement="rightTop"
        overlayClassName="action-popover"
        trigger="focus"
        content={
          <div className="d-flex flex-column">
            <Button
              style={{ color: 'green' }}
              type="text"
              icon={<CheckOutlined />}
              onClick={() => {
                setModalAction('approve');
                setModalVisible(true);
              }}
            >
              {getApproveButtonLabel(requestedStatus)}

            </Button>
            <Button
              danger
              type="text"
              icon={<CloseOutlined />}
              onClick={() => {
                setModalAction('reject');
                setModalVisible(true);
              }}
            >
              Reject
            </Button>

            <Button
              type="text"
              icon={<QuestionOutlined />}
              onClick={() => {
                setModalAction('clarification');
                setModalVisible(true);
              }}
            >
              Clarification Request
            </Button>
          </div>
        }
      >
        <Button
          icon={<MoreOutlined />}
          className="btn-outline-secondary border-0"
        ></Button>
      </Popover>

      <Modal
        title="Confirm Action"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
      >
        <Form.Item
          label={`${modalAction === 'clarification' ? 'Clarification Requester' : getActionerLabel(requestedStatus)}`}
        >
          <Input value={users.payload.find((e) => e.id === getUserData().id)?.full_name} />
        </Form.Item>
        <Form.Item
          label="Comment (optional)"
          name="comment"
        >
          <Input.TextArea
            rows={4}
            onChange={(e: any) => setOptionalComment(e.target.value)}
            value={optionalComment}
          />
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
  fetchAllDocumentAssignment: (action: any) =>
    dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionStatusComponent);
