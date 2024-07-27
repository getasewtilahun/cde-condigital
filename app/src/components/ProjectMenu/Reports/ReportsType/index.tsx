import { Button, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllDocumentAssignment } from "../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { fetchAllReports } from "../../../../redux/Reports/Reports.action";
import { fetchAllUser } from "../../../../redux/User/User.action";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { deleteData, ReportsTypePropType } from "./util/ReportsType.util";
import {
  MoreOutlined,
  DeleteColumnOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import { toNumber } from "lodash";
import AddRTComponent from "./components/Add/AddRT.component";
import EditRTComponent from "./components/Edit/EditRT.component";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import RFIComponent from "../../DocumentAssignment/components/Model/components/DesingInformation/components/Architectural/components/WIP/components/RFI/RFI.component";

const ReportsTypeComponent: FC<ReportsTypePropType> = ({
  project,
  users,
  reports,
  fetchAllDocumentAssignment,
  fetchAllReports,
  document_assignment,
  fetchUsers,
  type,
  tab,
}) => {
  const [reportData, setReportData] = useState<any[]>([]);

  useEffect(() => {
    fetchAllDocumentAssignment({
      project_id: project.payload.id,
    });
    fetchUsers();
    fetchAllReports({
      project_id: project.payload.id,
    });
  }, [fetchAllDocumentAssignment, fetchUsers, fetchAllReports, project, tab]);

  useEffect(() => {
    setReportData(
      reports.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
        // assigned_to: item.assigned_to
        //   ?.split(",")
        // .map((item: any) => toNumber(item)),
      }))
    );
  }, [reports]);

  console.log("Report", reports);
  const Remove = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllReports({
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

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent
          onClick={() =>
            fetchAllReports({
              project_id: project.payload.id,
            })
          }
        />
        {/* <AddRTComponent type={type} /> */}
      </div>
      <div className="col-md-12">
        <Table
          columns={[
            {
              title: "No",
              key: "no",
              width: "50px",
              render: (value: any, record: any, index: any) => <span>{index + 1}</span>,
            },
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
              title: "Ref No",
              key: "ref_no",
              width: "100px",
              dataIndex: "ref_no",
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
              width: "150px",
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
              title: "Author",
              key: "author",
              dataIndex: "author",
              width: "100px",
              render: (value: any, record: any) => (
                <span>
                  {users.payload.find((e) => e.id === record.author)?.full_name}
                </span>
              ),
            },
            {
              title: "Assigned To",
              key: "assigned_to",
              dataIndex: "assigned_to",
              width: "200px",
              render: (value: any, record: any) => {
                const assigned_toArray = record.assigned_to ? record.assigned_to.split(',') : [];

                if (assigned_toArray) {
                  return (
                    <ul className="pl-1">
                      {assigned_toArray.map((item: string, index: number) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                    </ul>
                  );
                } else {
                  return null;
                }
              }
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
                          `${record.document_name}`
                        )}                      ></Button>
                      <DocumentViewerComponent
                        document={record.document}
                        name={""}
                      />

                    </>
                  ) : null}
                </div>
              ),
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
                        <RFIComponent documentId={0} />
                        <EditRTComponent type={type} reports={record} />
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove this report?"
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
          dataSource={reportData
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .filter((e: any) => e.type === type)
          }
          loading={reports.isPending}
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
  reports: state.reports.fetchAll,
  document_assignment: state.document_assignment.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllReports: (action: any) => dispatch(fetchAllReports(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllDocumentAssignment: (action: any) =>
    dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsTypeComponent);
