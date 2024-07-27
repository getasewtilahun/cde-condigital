import { Button, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllDocumentAssignment } from "../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { fetchAllRequestForInformation } from "../../../../../redux/RequestForInformation/RequestForInformation.action";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { ErrorHandler } from "../../../../../utilities/utilities";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import {
  RequestForInformationPropType,
  deleteData,
} from "./util/RequestForInformation.util";
import {
  MoreOutlined,
  DeleteColumnOutlined,
  DownloadOutlined, CheckCircleOutlined, MessageOutlined, RedoOutlined, ClockCircleOutlined
} from "@ant-design/icons";
import AddRFIComponent from "./components/Add/AddRFI.component";
import EditRFIComponent from "./components/Edit/EditRFI.component";
import ActionStatusComponent from "./components/ActionStatus/ActionStatus.component";
import AllActionStatusComponent from "./components/AllActionStatus/AllActionStatus.component";


const RequestForInformationComponent: FC<RequestForInformationPropType> = ({
  project,
  users,
  request_for_information,
  fetchAllDocumentAssignment,
  fetchAllRequestForInformation,
  fetchUsers,
  document_assignment,
  tab,
}) => {
  const [requestData, setRequestData] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  useEffect(() => {
    fetchAllDocumentAssignment({
      project_id: project.payload.id,
    });
    fetchUsers();
    fetchAllRequestForInformation({
      project_id: project.payload.id,
    });
  }, [
    fetchAllDocumentAssignment,
    fetchUsers,
    fetchAllRequestForInformation,
    project,
    tab,
  ]);

  console.log("this is document assignment");
  console.log(document_assignment);

  useEffect(() => {
    setRequestData(
      request_for_information.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }))
    );
  }, [request_for_information]);

  const Remove = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllRequestForInformation({
          project_id: project.payload.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Deleted!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete",
            e.message
          )
        );
      });
  };

  const handleDocClick = (docId: string) => {
    setSelectedDocument(docId);
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent
          onClick={() =>
            fetchAllRequestForInformation({
              project_id: project.payload.id,
            })
          }
        />
        {/* <AddRFIComponent /> */}
      </div>
      <div className="col-md-12">
        <Table
          columns={[
            {
              title: "No",
              key: "no",
              width: "50px",
              render: (value: any, record: any, index: number) => <span>{index + 1}</span>,
            },
            {
              title: "Subject",
              key: "subject",
              width: "150px",
              dataIndex: "subject",
            },
            {
              title: "Description",
              key: "description",
              width: "200px",
              dataIndex: "description",
            },
            {
              title: "Reference No",
              key: "reference_no",
              width: "100px",
              dataIndex: "reference_no",
            },
            {
              title: (
                <div style={{ marginBottom: "10px", border: "1px solid #ddd", padding: "10px" }}>
                  <p style={{ marginBottom: "5px" }}>Considered Doc IDs</p>
                  <hr style={{ border: "1px solid #ddd", margin: "0" }} />

                  {/* Headers Only */}
                  <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
                    <thead>
                      <tr style={{ border: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Document ID</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Status</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Revision</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              ),
              key: "considered_doc",
              width: "300px",
              render: (data: any, record: any) => {
                if (record.considered_doc_id) {
                  const consideredDocs = record.considered_doc_id.split(',');
                  const documentIds = record.document_assignment_id.split(',');

                  console.log("consideredDocs:", consideredDocs);
                  console.log("documentIds:", documentIds);

                  return (
                    <div style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {/* Data Table */}
                      <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <tbody>
                          {consideredDocs.map((doc: string, index: number) => {
                            const [docId, status, revision] = doc.split('_');
                            const assignedDocument = document_assignment.payload.find(
                              (da: any) => da.document_name === docId);

                            const assignedDocumentData = assignedDocument?.document || { url: "" };

                            return (
                              <tr key={`${index}_${docId}_${status}_${revision}`} style={{ border: "1px solid #ddd" }}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>

                                  {/* {docId} */}
                                  <DocumentViewerComponent
                                    key={`${docId}`}
                                    document={assignedDocumentData}
                                    name={docId}
                                  />
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{status}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{revision}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return null;
              }


            },

            {
              title: "Date",
              key: "date",
              width: "100px",
              dataIndex: "date",
            },
            {
              title: "From",
              key: "from",
              dataIndex: "from",
              width: "100px",
              render: (value: any, record: any) => (
                <span>
                  {users.payload.find((e) => e.id === record.from)?.full_name}
                </span>
              ),
            },
            {
              title: "Assigned To",
              key: "assigned_to",
              dataIndex: "assigned_to",
              width: "100px",
              render: (value: any, record: any) => (
                <span>
                  {
                    users.payload.find((e) => e.id === record.assigned_to)
                      ?.full_name
                  }
                </span>
              ),
            },
            {
              title: "CC",
              key: "cc",
              dataIndex: "cc",
              width: "100px",
              render: (value: any, record: any) => {
                const ccArray = record.cc ? record.cc.split(',') : [];

                return (
                  <ul className="pl-1">
                    {ccArray.map((item: string, index: number) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                );
              },
            },
            {
              title: "File",
              key: "file",
              width: "100px",
              render: (value: any, record: any) => (
                <div className="d-flex">
                  {record.document ? (
                    <>
                      <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        className="mr-2"
                        onClick={() => DownloadFile(
                          record.document,
                          `${record.document_name}_${record.status}`
                        )}
                      ></Button>
                      <DocumentViewerComponent
                        document={record.document}
                        name={""}
                      />
                    </>
                  ) : null}
                  < AllActionStatusComponent RequestID={record.id} tab={""} request_for_information_statuses={record.request_for_information_statuses} document={record.document} />                </div>
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
                let requestStatus = "";
                let message = "";

                if (record) {
                  requestStatus = record.status;
                  message = record.message;

                  if (requestStatus === "Answered") {
                    color = "green";
                    icon = <CheckCircleOutlined />;
                  } else if (requestStatus === "Solved") {
                    color = "blue";
                    icon = <MessageOutlined />;
                  } else if (requestStatus === "Reopened") {
                    color = "red";
                    icon = <RedoOutlined />;
                  } else if (requestStatus === "Pending") {
                    color = "orange";
                    icon = <ClockCircleOutlined />;
                  }
                }

                return (
                  <div>
                    {/* <DocumentViewerComponent document={record.document} /> */}
                    <Popconfirm
                      placement="leftTop"
                      title={
                        <div>
                          <span><strong>{requestStatus === "Answered" ? "Answered Message" : ""}</strong></span>
                          <span><strong>{requestStatus === "Solved" ? "Solved Message" : ""}</strong></span>
                          <span><strong>{requestStatus === "Reopened" ? "Reopened Message" : ""}</strong></span>
                          <div
                            style={{
                              maxHeight: '200px', // Adjust the max height as needed
                              overflowY: 'auto',
                              width: '300px'
                            }}
                          >
                            {message}
                          </div>
                        </div>
                      }
                      cancelText=""
                      trigger="click"
                    >
                      <span style={{ color, display: 'inline-flex', alignItems: 'center' }}>
                        {icon} {requestStatus}
                      </span>
                    </Popconfirm>
                  </div>
                );
              },
            },

            {
              title: "Action",
              align: "center",
              width: "150px",
              render: (value: any, record: any) => (
                <>
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <ActionStatusComponent
                          category={''}
                          folder={''}
                          sub_folder={''}
                          type={''}
                          document_assignment={record}
                          id={record.id}
                        />
                        <EditRFIComponent request_for_information={record} />
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove this request?"
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
                </>
              ),
            },
          ]}
          dataSource={requestData
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          }
          loading={request_for_information.isPending}
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
  document_assignment: state.document_assignment.fetchAll,
  request_for_information: state.request_for_information.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllDocumentAssignment: (action: any) =>
    dispatch(fetchAllDocumentAssignment(action)),
  fetchAllRequestForInformation: (action: any) =>
    dispatch(fetchAllRequestForInformation(action)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestForInformationComponent);
