import React, { FC, useEffect, useState } from "react";
import { Button, Popconfirm, Popover, Table, Checkbox, Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../../../../../../../../../redux/User/User.action";
import { DownloadFile } from "../../../../../../../../../../Document/MyDocument/index.util";
import {
  WIPPropType,
  deleteData,
  accessAssignDetailData,
} from "./util/WIP.util";
import {
  DownloadOutlined,
  MoreOutlined,
  DeleteColumnOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  QuestionOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { OpenNotification } from "../../../../../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../../../../../utilities/utilities";
import { UserAssignment } from "../../../../../../../../../../../redux/UserAssignment/UserAssignment.type";
import { fetchAllUserAssignment } from "../../../../../../../../../../../redux/UserAssignment/UserAssignment.action";
import AddWIPComponent from "./components/Add/AddWIP.component";
import { fetchAllDocumentAssignment } from "../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import StatusChangeRequestComponent from "./components/StatusChangeRequest/StatusChangeRequest.component";
import RFIComponent from "./components/RFI/RFI.component";
import AttachQualityReportComponent from "./components/AttachQualityReport/AttachQualityReport.component";
import ReloadButtonComponent from "../../../../../../../../../../common/ReloadButton/ReloadButton.component";
import { checkModuleAuthorization } from "../../../../../../../../../../../utilities/utilities";
import { useLocation } from "react-router";
import EditWIPComponent from "./components/Edit/EditWIP.component";
import DocumentViewerComponent from "../../../../../../../../../../common/DocumentViewer/DocumentViewer.component";

const WIPComponent: FC<WIPPropType> = ({
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
  const [selected, setSelected] = useState<UserAssignment | undefined>();
  const [assignData, setAssignData] = useState<any>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [reportAction, setReportAction] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const location = useLocation();
  const path = location.pathname;
  const project_id = parseInt(path.split("/")[2]);

  const handleReportAction = (action: string) => {
    setReportAction(action);
    setIsModalVisible(true);
  };


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

  useEffect(() => {
    setAssignData(
      accessAssignDetailData(user_assignment.payload, getUserData().id)
    );
  }, [user_assignment]);

  useEffect(() => {
    if (assignData.length) {
      const found = assignData.find(
        (e: any) =>
          e.category === category &&
          e.folder === folder &&
          e.sub_folder === sub_folder &&
          e.description === type
      );
      setSelected(found);
    }
  }, [assignData, category, folder, sub_folder, type]);

  const columns = [
    {
      title: "Date",
      key: "date",
      width: "100px",
      dataIndex: "date",
    },
    {
      title: "Document ID",
      key: "document_name",
      width: "250px",
      dataIndex: "document_name",
    },
    {
      title: "Description",
      key: "description",
      width: "200px",
      dataIndex: "description",
    },
    {
      title: "Current Status",
      key: "status",
      width: "100px",
      dataIndex: "status",
    },
    {
      title: "Requested Status",
      key: "requested_status",
      render: (value: any, record: any) => (
        <span>
          {record?.DocumentStatuses?.[0]?.requested_status || ""}
        </span>
      ),
    },
    {
      title: "Revision",
      key: "revision",
      width: "100px",
      dataIndex: "revision",
      render: (text: any, record: any) =>
        `${text}.${record.version}`,
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
      title: "Reviewed By",
      key: "action_by",
      dataIndex: "action_by",
      width: "100px",
      render: (value: any, record: any) => (
        <span>
          {record?.DocumentStatuses?.[0]?.reviewed_by
            ? users.payload.find(
              (e) =>
                e.id === record.DocumentStatuses[0].reviewed_by
            )?.full_name
            : ""}
        </span>
      ),
    },
    {
      title: "Rejected/Requested By",
      key: "approved_by",
      dataIndex: "approved_by",
      width: "100px",
      render: (value: any, record: any) => (
        <span>
          {(record?.DocumentStatuses[0]?.action_status === "Rejected" || record?.DocumentStatuses[0]?.action_status === "Requested") &&
            record?.DocumentStatuses?.[0]?.reviewed_by
            ? users.payload.find(
              (e) =>
                e.id === record.DocumentStatuses[0].reviewed_by
            )?.full_name
            : ""}
        </span>
      ),
    },

    {
      title: "Classification",
      key: "classification",
      width: "200px",
      dataIndex: "classification",
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
                `${record.document_name}_${record.status}_${record.revision}`
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
      title: "Action Status",
      key: "action_status",
      width: "300px",
      dataIndex: "action_status",
      render: (value: any, record: any) => {
        let color = "";
        let icon = null;
        let docStatus = "";
        let comment = "";
        let displayStatus = "";

        if (record?.DocumentStatuses?.length > 0) {
          docStatus = record.DocumentStatuses[0].action_status;
          comment = record.DocumentStatuses[0].comment;
          displayStatus = docStatus;

          if (comment) {
            displayStatus += " With Comment";
          }

          if (docStatus === "Approved") {
            color = "green";
            icon = <CheckOutlined />;
          } else if (docStatus === "Rejected") {
            color = "red";
            icon = <CloseOutlined />;
          } else if (docStatus === "Pending") {
            color = "orange";
            icon = <ClockCircleOutlined />;
          } else if (docStatus === "Requested") {
            color = "orange";
            icon = <QuestionOutlined />;
          }
        }

        return (
          <Popconfirm
            placement="leftTop"
            title={
              <div>
                {docStatus === "Approved" && <span><strong>Approved Comment</strong></span>}
                {docStatus === "Rejected" && <span><strong>Rejected Comment</strong></span>}
                {docStatus === "Requested" && <span><strong>Requested Comment</strong></span>}
                <div
                  style={{
                    maxHeight: '200px', // Adjust the max height as needed
                    overflowY: 'auto',
                    width: '300px'
                  }}
                >
                  {comment}
                </div>
              </div>
            }
            cancelText=""
            trigger="click"
          >
            <span style={{ color, display: 'inline-flex', alignItems: 'center' }}>
              {icon} {displayStatus}
            </span>
          </Popconfirm>
        );
      },
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
              {checkModuleAuthorization("Model Document", false, "edit") ? (
                <EditWIPComponent
                  document_assignment={record}
                  category={category}
                  folder={folder}
                  sub_folder={sub_folder}
                  type={type}
                  selected={undefined}
                />
              ) : null}

              {
                checkModuleAuthorization("Model Document", false, "edit") &&
                record?.DocumentStatuses?.[0]?.action_status !== "Approved" && (
                  <StatusChangeRequestComponent
                    category={category}
                    folder={folder}
                    sub_folder={sub_folder}
                    type={type}
                    document_assignment={record}
                    actionStatus={record?.DocumentStatuses?.[0]?.action_status}
                    documentStatusId={record?.DocumentStatuses?.[0]?.id}
                  />
                )
              }
              {checkModuleAuthorization("Model Document", false, "edit") ? (
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
              ) : null}
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

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.key)
  );

  const user = getUserData();

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
        {checkModuleAuthorization("Model Document", false, "write") ? (
          <AddWIPComponent
            category={category}
            folder={folder}
            sub_folder={sub_folder}
            type={type}
            selected={selected}
          />
        ) : null}
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
              (e) => e.type === type && e.project_id === project_id && e.sub_folder === sub_folder
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

export default connect(mapStateToProps, mapDispatchToProps)(WIPComponent);
