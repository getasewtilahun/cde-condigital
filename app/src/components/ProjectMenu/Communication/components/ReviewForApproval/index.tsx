import { Button, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import {
  ReviewForApprovalPropType,
  deleteData,
  accessAssignDetailData,
} from "./util/ReviewForApproval.util";
import { DownloadOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../utilities/utilities";
import { UserAssignment } from "../../../../../redux/UserAssignment/UserAssignment.type";

import { fetchAllUserAssignment } from "../../../../../redux/UserAssignment/UserAssignment.action";
import AddWIPComponent from "./components/Add/AddWIP.component";
import { fetchAllDocumentAssignment } from "../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { MoreOutlined, DeleteColumnOutlined } from "@ant-design/icons";
import StatusChangeRequestComponent from "./components/StatusChangeRequest/StatusChangeRequest.component";
import ActionStatusComponent from "./components/ActionStatus/ActionStatus.component";
import RFIComponent from "./components/RFI/RFI.component";
import AttachQualityReportComponent from "./components/AttachQualityReport/AttachQualityReport.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";

import { checkModuleAuthorization } from "../../../../../utilities/utilities";
import { useLocation } from "react-router";
import EditWIPComponent from "./components/Edit/EditWIP.component";
import { CheckOutlined, CloseOutlined, ClockCircleOutlined, QuestionOutlined, EditOutlined } from "@ant-design/icons";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";

const WIPComponent: FC<ReviewForApprovalPropType> = ({
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
  const [projectId, setProjectId] = useState<any>();

  useEffect(() => {
    fetchAllUserAssignment({ project_id: project_id });
    fetchAllDocumentAssignment({
      project_id: project_id,
      category: category,
      folder: folder,
      sub_folder: sub_folder,
      type: type,
    });
    fetchUsers();
  }, [
    fetchAllUserAssignment,
    fetchAllDocumentAssignment,
    fetchUsers,
    project,
    tab,
    category,
    folder,
    sub_folder,
    type,
  ]);


  const location = useLocation();
  const path = location.pathname;
  const project_id = path.split('/')[2];
  // setProjectId(projectId);

  useEffect(() => {
    setAssignData(
      accessAssignDetailData(user_assignment.payload, getUserData().id)
    );
  }, [user_assignment]);


  useEffect(() => {

    project_id && fetchAllDocumentAssignment({
      project_id: project_id,
      category: category,
      folder: folder,
      sub_folder: sub_folder,
      type: type,
    })

  }, [fetchAllDocumentAssignment, project_id]);

  console.log('revender');

  useEffect(() => {
    if (assignData.length) {
      let found = assignData.find(
        (e: any) =>
          e.category === category &&
          e.folder === folder &&
          e.sub_folder === sub_folder &&
          e.description === type
      );
      setSelected(found);
    }
  }, [
    user_assignment,
    setSelected,
    assignData,
    category,
    folder,
    sub_folder,
    type,
  ]);

  const Remove = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllDocumentAssignment({
          project_id: project_id,
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type: type,
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

  const user = getUserData();
  console.log("user data", user)
  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent
          onClick={() =>
            fetchAllDocumentAssignment({
              project_id: project_id,
              category: category,
              folder: folder,
              sub_folder: sub_folder,
              type: type,
            })
          }
        />
        {/* {checkModuleAuthorization('WIP', false, "write") ? (
          <AddWIPComponent
            category={category}
            folder={folder}
            sub_folder={sub_folder}
            type={type}
            selected={selected}
          />
        ) : null} */}
      </div>
      <div className="col-md-12">
        <Table
          columns={[
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

              render: (value: any, record: any) => (
                <span>
                  {record && record.DocumentStatuses && record.DocumentStatuses[0] && record.DocumentStatuses[0].current_status
                    ? record.DocumentStatuses[0].current_status
                    : ''}
                </span>
              ),
            },

            {
              title: "Requested Status",
              key: "requested_status",
              width: "100px",
              dataIndex: "requested_status",
              render: (value: any, record: any) => (
                <span>
                  {record && record.DocumentStatuses && record.DocumentStatuses[0] && record.DocumentStatuses[0].requested_status
                    ? record.DocumentStatuses[0].requested_status
                    : ''}
                </span>
              ),
            },
            {
              title: "Revision",
              key: "revision",
              width: "100px",
              dataIndex: "revision",
            },
            {
              title: "Author",
              key: "author",
              dataIndex: "author",
              width: "100px",
              render: (value: any, record: any) => (
                <span>
                  {users.payload.find((e: any) => e.id === record.author)?.full_name}
                </span>
              ),
            },
            {
              title: "Reviewed BY",
              key: "reviewed_by",
              dataIndex: "reviewed_by",
              width: "100px",
              render: (value: any, record: any) => (
                <span>
                  {record && record.DocumentStatuses && record.DocumentStatuses[0] && record.DocumentStatuses[0].reviewed_by
                    ? users.payload.find((e) => e.id === record.DocumentStatuses[0].reviewed_by)?.full_name
                    : ''}
                </span>
              )
            },
            {
              title: "Approved/Rejected By",
              key: "approved_by",
              dataIndex: "approved_by",
              width: "100px",
              render: (value: any, record: any) => {
                if (record && record.DocumentStatuses && record.DocumentStatuses[0]) {
                  const docType = record.DocumentStatuses[0].type;
                  if (docType === "WIP") {
                    return null; // Return null to hide the column
                  }
                  const approvedBy = record.DocumentStatuses[0].approved_by;
                  return (
                    <span>
                      {approvedBy ? users.payload.find((e) => e.id === approvedBy)?.full_name : ''}
                    </span>
                  );
                }
                return null; // Return null if DocumentStatuses or its elements are missing
              }
            },
            {
              title: "Authorized/Rejected By",
              key: "authorized_by",
              dataIndex: "authorized_by",
              width: "100px",
              render: (value: any, record: any) => {
                if (record && record.DocumentStatuses && record.DocumentStatuses[0]) {
                  const docType = record.DocumentStatuses[0].type;
                  if (docType === "WIP") {
                    return null; // Return null to hide the column
                  }
                  const authorizedBy = record.DocumentStatuses[0].authorized_by;
                  return (
                    <span>
                      {authorizedBy ? users.payload.find((e) => e.id === authorizedBy)?.full_name : ''}
                    </span>
                  );
                }
                return null; // Return null if DocumentStatuses or its elements are missing
              }
            },
            {
              title: "Accepted/Rejected By",
              key: "accepted_by",
              dataIndex: "accepted_by",
              width: "100px",
              render: (value: any, record: any) => {
                if (record && record.DocumentStatuses && record.DocumentStatuses[0]) {
                  const docType = record.DocumentStatuses[0].type;
                  if (docType === "WIP") {
                    return null; // Return null to hide the column
                  }
                  const authorizedBy = record.DocumentStatuses[0].accepted_by;
                  return (
                    <span>
                      {authorizedBy ? users.payload.find((e) => e.id === authorizedBy)?.full_name : ''}
                    </span>
                  );
                }
                return null; // Return null if DocumentStatuses or its elements are missing
              }
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
              title: "Action Status",
              key: "action_status",
              width: "300px",
              dataIndex: "action_status",
              render: (value: any, record: any) => {
                let color = '';
                let icon = null;
                let docStatus = '';

                // Check if record and DocumentStatuses exist and are non-empty arrays
                if (record && record.DocumentStatuses && record.DocumentStatuses.length > 0) {
                  docStatus = record.DocumentStatuses[0].action_status;

                  // Determine color and icon based on status
                  if (docStatus === "Approved") {
                    color = 'green';
                    icon = <CheckOutlined />;
                  } else if (docStatus === "Reject") {
                    color = 'red';
                    icon = <CloseOutlined />;
                  } else if (docStatus === "Pending") {
                    color = 'orange';
                    icon = <ClockCircleOutlined />;
                  }
                }

                // Return the JSX element with the specified color, icon, and docStatus
                return (
                  <span style={{ color }}>
                    {icon} {docStatus}
                  </span>
                );
              },
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
                    onClick={() => DownloadFile(record.document, `${record.document_name}_${record.status}_${record.revision}`)}
                  ></Button>
                  <DocumentViewerComponent
                    document={record.document}
                    name={""}
                  />
                </div>
              ),
            },
            {
              title: "Action",
              align: "center",
              width: "150px",
              render: (value: any, record: any) => (
                <ActionStatusComponent
                  category={category}
                  folder={folder}
                  sub_folder={sub_folder}
                  type={type}
                  document_assignment={record}
                />
              ),
            }

          ]}
          dataSource={document_assignment.payload
            // Map each element to include its DocumentStatuses array
            .map((item: any) => {
              return {
                ...item,
                DocumentStatuses: item.DocumentStatuses.filter((status: any) => status.action_status === 'Pending')
              };
            })
            // Filter out elements whose DocumentStatuses array is empty
            .filter((item: any) => item.DocumentStatuses.length > 0)
            .sort((a: any, b: any) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateB.getTime() - dateA.getTime();
            })}

          loading={document_assignment.isPending}
          scroll={{ x: 10 }}
        />
      </div>
    </div>
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
  user_assignment: state.user_assignment.fetchAll,
  document_assignment: state.document_assignment.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllUserAssignment: (action: any) =>
    dispatch(fetchAllUserAssignment(action)),
  fetchAllDocumentAssignment: (action: any) =>
    dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WIPComponent);
