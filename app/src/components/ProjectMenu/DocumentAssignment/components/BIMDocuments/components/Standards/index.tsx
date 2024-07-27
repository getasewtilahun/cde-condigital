import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Button, Popconfirm, Popover, Dropdown, Menu, Checkbox } from "antd";
import { DownloadOutlined, MoreOutlined, DeleteColumnOutlined, SettingOutlined } from "@ant-design/icons";
import AddDocumentComponent from "../../../SharedDocumentsAndReferenceInformation/components/ProjectDocuments/components/AddDocument/AddDocument.component";
import { UserAssignment } from "../../../../../../../redux/UserAssignment/UserAssignment.type";
import { accessAssignDetailData, deleteData, StandardsPropType } from "./util/Standards.util";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import { fetchAllUserAssignment } from "../../../../../../../redux/UserAssignment/UserAssignment.action";
import { fetchAllDocumentAssignment } from "../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { useLocation } from "react-router";
import { ErrorHandler, getUserData } from "../../../../../../../utilities/utilities";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import ReloadButtonComponent from "../../../../../../common/ReloadButton/ReloadButton.component";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import EditDocumentComponent from "../../../SharedDocumentsAndReferenceInformation/components/ProjectDocuments/components/EditDocument/EditDocument.component";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";

const StandardsComponent: FC<StandardsPropType> = ({
    project,
    users,
    user_assignment,
    document_assignment,
    fetchUsers,
    fetchAllUserAssignment,
    fetchAllDocumentAssignment,
    tab,
    category,
    folder,
    sub_folder,
    type,
}) => {
    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
    const [selected, setSelected] = useState<UserAssignment | undefined>();


    const location = useLocation();
    const path = location.pathname;
    const project_id = parseInt(path.split("/")[2]);

    useEffect(() => {
        fetchAllUserAssignment({ project_id });
        fetchAllDocumentAssignment({
            project_id,
            category,
            folder,
            sub_folder,
            type,
        });
        fetchUsers();
    }, [
        fetchAllUserAssignment,
        fetchAllDocumentAssignment,
        fetchUsers,
        project_id,
        category,
        folder,
        sub_folder,
        type,
    ]);

    const Remove = (id: any) => {
        deleteData(id)
            .then(() => {
                fetchAllDocumentAssignment({
                    project_id,
                    category,
                    folder,
                    sub_folder,
                    type,
                });
                OpenNotification(NotificationType.SUCCESS, "Document deleted!", "");
            })
            .catch((error) => {
                ErrorHandler(error).map((e: any) =>
                    OpenNotification(
                        NotificationType.ERROR,
                        "Failed to delete document",
                        e.message
                    )
                );
            });
    };

    const columns = [
        {
            title: "Date",
            key: "date",
            width: "120px",
            dataIndex: "date",
        },
        {
            title: "Document ID",
            key: "document_name",
            width: "150px",
            dataIndex: "document_name",
        },
        {
            title: "Description",
            key: "description",
            width: "300px",
            dataIndex: "description",
        },
        {
            title: "Version",
            key: "version",
            width: "100px",
            dataIndex: "version",
        },
        {
            title: "Author",
            key: "author",
            dataIndex: "author",
            width: "100px",
            render: (value: any, record: any) => (
                <span>
                    {
                        users.payload.find((e) => e.id === record.author)
                            ?.full_name
                    }
                </span>
            ),
        },
        {
            title: "Originator",
            key: "originato_r",
            width: "150px",
            dataIndex: "originato_r",
        },
        {
            title: "Format",
            key: "format",
            width: "100px",
            dataIndex: "format",
        },
        {
            title: "File",
            key: "file",
            width: "100px",
            render: (value: any, record: any) => (
                <div className="d-flex">
                    <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        className="mr-2"
                        onClick={() =>
                            DownloadFile(
                                record.document,
                                `${record.document_name}_${record.version}`
                            )
                        }
                    ></Button>
                    <DocumentViewerComponent
                        document={record.document}
                        name={""}
                    />
                </div>
            ),
        },
        {
            title: "Remark",
            key: "remark",
            width: "200px",
            dataIndex: "remark",
        },
        {
            title: "Action",
            align: "center",
            width: "150px",
            key: "action",
            render: (value: any, record: any) => (
                <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                        <div className="d-flex flex-column">
                            <EditDocumentComponent
                                document_assignment={record}
                                category={category}
                                folder={folder}
                                sub_folder={sub_folder}
                                type={"Standard"}
                                selected={undefined}
                            />
                            <Popconfirm
                                placement="leftTop"
                                title="Are you sure you want to remove this document?"
                                onConfirm={() => Remove(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    danger
                                    type="text"
                                    icon={<DeleteColumnOutlined />}
                                >
                                    Delete
                                </Button>
                            </Popconfirm>
                        </div>
                    }
                >
                    <Button
                        icon={<MoreOutlined />}
                        className="btn-outline-secondary border-0"
                    ></Button>
                </Popover>
            ),
        },
    ];

    useEffect(() => {
        setVisibleColumns(columns.map((col) => col.key));
    }, []);

    const handleColumnChange = (checkedValues: any) => {
        setVisibleColumns(checkedValues);
    };

    const columnMenu = (
        <Menu>
            <Checkbox.Group
                style={{ display: "flex", flexDirection: "column" }}
                options={columns.map((col) => ({
                    label: col.title,
                    value: col.key,
                }))}
                value={visibleColumns}
                onChange={handleColumnChange}
            />
        </Menu>
    );

    const RemoveRequirement = (id: any) => {

    };

    const filteredColumns = columns.filter((col) =>
        visibleColumns.includes(col.key)
    );

    return (
        <div className="row">
            <div className="col-md-12 mb-2">
                <ReloadButtonComponent
                    onClick={() =>
                        fetchAllDocumentAssignment({
                            project_id,
                            category,
                            folder,
                            sub_folder,
                            type,
                        })
                    }
                />
                <AddDocumentComponent
                    category={""}
                    folder={""}
                    sub_folder={""}
                    type={"Standard"}
                    selected={selected}
                />
            </div>
            <div className="col-md-12 mb-2">
                <Dropdown overlay={columnMenu} trigger={["click"]}>
                    <Button icon={<SettingOutlined />}>Column Visibility</Button>
                </Dropdown>
            </div>
            <div className="col-md-12">
                <Table
                    columns={filteredColumns}
                    dataSource={document_assignment.payload
                        .filter(
                            (e) => e.type === "Standard" && e.project_id === project_id
                        )
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )}
                    loading={document_assignment.isPending}
                    scroll={{ x: 10 }}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    project: state.project.fetchOne,
    users: state.user.fetchAll,
    user_assignment: state.user_assignment.fetchAll,
    document_assignment: state.document_assignment.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
    fetchAllUserAssignment: (action: any) =>
        dispatch(fetchAllUserAssignment(action)),
    fetchAllDocumentAssignment: (action: any) =>
        dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StandardsComponent);
