import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Popover, Select, Input, Form } from "antd";
import { NotificationType } from "../../../../../../../../../constants/Constants";
import { MoreOutlined, CheckCircleOutlined, RedoOutlined } from "@ant-design/icons";
import { ErrorHandler } from "../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../common/Notification/Notification.component";
import { ActionPropType, answerForRequested } from "../../util/ProjectDocuments.util";
import { useLocation } from "react-router";
import { format } from 'date-fns';
import { fetchAllDocumentAssignment } from "../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";

const { Option } = Select;

const ActionComponent: FC<ActionPropType & { id: string }> = ({
    document_assignment,
    project,
    category,
    folder,
    sub_folder,
    fetchAllDocumentAssignment,
    type,
    id,
    users
}) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState<'give_access' | 'remove_access' | 'private' | 'every_one' | null>(null);
    const [requestedStatus, setRequestedStatus] = useState<string>('');
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [optionalComment, setOptionalComment] = useState<string>('');
    const [havingAccessUsers, setHavingAccessUsers] = useState<string[]>([]);

    useEffect(() => {
        const requestedStatus = document_assignment?.DocumentStatuses?.[0]?.requested_status || '';
        setRequestedStatus(requestedStatus);
    }, [document_assignment.DocumentStatuses]);

    // Update havingAccessUsers when modalAction changes to 'remove_access'
    useEffect(() => {
        if (modalAction === 'remove_access' || modalAction === 'give_access') {
            const statu_s = document_assignment?.statu_s || '';
            const usersWithAccess = statu_s.split(',').map(name => name.trim());
            console.log("usersWithAccess", usersWithAccess);
            setHavingAccessUsers(usersWithAccess.filter(name => name !== 'Private' && name !== 'Every One'));
        } else {
            setHavingAccessUsers([]);
        }
    }, [modalAction, document_assignment]);

    const location = useLocation();
    const path = location.pathname;
    const project_id = parseInt(path.split("/")[2]);

    const handleActionClick = (action: 'give_access' | 'remove_access' | 'private' | 'every_one') => {
        setModalAction(action);
        setModalVisible(true);
    };

    const handleModalOk = () => {
        if (!modalAction) return;

        let statu_s: string | undefined = undefined;

        switch (modalAction) {
            case 'give_access':
                statu_s = havingAccessUsers.join(', ');
                break;
            case 'remove_access':
                statu_s = havingAccessUsers.join(', ');
                break;
            case 'private':
                statu_s = 'Private';
                break;
            case 'every_one':
                statu_s = 'Every One';
                break;
            default:
                break;
        }

        const formattedDateTime = format(new Date(), 'yyyy-MM-dd HH:mm');

        const data: any = {
            id: String(id),
            from: Number(selectedUserId),
            user_id: Number(selectedUserId),
            message: optionalComment,
            date: formattedDateTime,
            statu_s,
        };

        setLoading(true);

        answerForRequested(data)
            .then(() => {
                setLoading(false);
                fetchAllDocumentAssignment({
                    project_id: project.payload.id,
                    category,
                    folder,
                    sub_folder,
                    type_on_status: requestedStatus,
                });
                OpenNotification(NotificationType.SUCCESS, `Document has been updated ${data.statu_s.toLowerCase()}!`, "");
            })
            .catch((error) => {
                setLoading(false);
                ErrorHandler(error).map((e: any) =>
                    OpenNotification(
                        NotificationType.ERROR,
                        `Failed to ${data.statu_s.toLowerCase()} Document`,
                        e.message
                    )
                );
            });

        setModalVisible(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const getActionerLabel = (requestedStatus: string) => {
        switch (modalAction) {
            case 'give_access':
                return 'Give Access By';
            case 'remove_access':
                return 'Remove Access By';
            case 'private':
                return 'Make Private By';
            case 'every_one':
                return 'Make Everyone By';
            default:
                return 'Actioner';
        }
    };
    const unselectedUsers = users.payload.filter(
        (user: any) => !havingAccessUsers.includes(user.full_name)
    );
    console.log("unselectedUsers", unselectedUsers);


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
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleActionClick('give_access')}
                        >
                            Give Access
                        </Button>
                        <Button
                            style={{ color: 'green' }}
                            type="text"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleActionClick('remove_access')}
                        >
                            Remove Access
                        </Button>
                        <Button
                            style={{ color: 'green' }}
                            type="text"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleActionClick('private')}
                        >
                            Make Private
                        </Button>
                        <Button
                            type="text"
                            style={{ color: 'green' }}
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleActionClick('every_one')}
                        >
                            Make Everyone
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
                {/* <Form.Item
                    label={getActionerLabel(requestedStatus)}
                    name="actioner"
                    initialValue={selectedUserId}
                    rules={[{ required: true, message: "Actioner Required!" }]}
                >
                    <Select onChange={(value: string) => setSelectedUserId(value)} value={selectedUserId}>
                        {users.payload.map((user: any) => (
                            <Option key={user.id} value={user.id}>
                                {user.full_name} - {user.email}
                            </Option>
                        ))}
                    </Select>
                </Form.Item> */}
                {modalAction === 'give_access' || modalAction === 'remove_access' ? (
                    <Form.Item
                        label="Having access user(s)"
                        initialValue={havingAccessUsers}
                    >
                        <Select
                            mode="multiple"
                            value={havingAccessUsers}
                            onChange={(selectedUsers: string[]) => setHavingAccessUsers(selectedUsers)}
                        >
                            {unselectedUsers.map((user: any) => (
                                <Option key={user.id} value={user.full_name}>
                                    {user.full_name} - {user.email}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item
                    >
                        <p>
                            {modalAction === 'private' && 'Are you sure you want to make this document private?'}
                            {modalAction === 'every_one' && 'Are you sure you want to make this document accessible to everyone?'}
                        </p>
                    </Form.Item>
                )}



                {/* <Form.Item
                    label="Comment (optional)"
                    name="comment"
                >
                    <Input.TextArea
                        rows={4}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOptionalComment(e.target.value)}
                        value={optionalComment}
                    />
                </Form.Item> */}
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
)(ActionComponent);
