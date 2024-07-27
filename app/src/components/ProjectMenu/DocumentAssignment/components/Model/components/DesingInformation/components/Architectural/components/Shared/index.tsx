import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Dropdown, Menu, Popconfirm, Popover, Table } from "antd";
import { DownloadOutlined, MoreOutlined, SettingOutlined } from "@ant-design/icons";
import { NotificationType } from "../../../../../../../../../../../constants/Constants";
import { fetchAllDocumentAssignment } from "../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { fetchAllUser } from "../../../../../../../../../../../redux/User/User.action";
import { ErrorHandler } from "../../../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../../../common/Notification/Notification.component";
import { DownloadFile } from "../../../../../../../../../../Document/MyDocument/index.util";
import { deleteData, SharedPropType } from "./util/Shared.util";
import RFIComponent from "../WIP/components/RFI/RFI.component";
import AttachQualityReportComponent from "../WIP/components/AttachQualityReport/AttachQualityReport.component";
import StatusChangeRequestComponent from "./components/StatusChangeRequest/StatusChangeRequest.component";
import ReloadButtonComponent from "../../../../../../../../../../common/ReloadButton/ReloadButton.component";
import { CheckOutlined, CloseOutlined, QuestionOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import DocumentViewerComponent from "../../../../../../../../../../common/DocumentViewer/DocumentViewer.component";

const SharedComponent: FC<SharedPropType> = ({
  users,
  project,
  document_assignment,
  fetchAllDocumentAssignment,
  fetchUsers,
  tab,
  category,
  folder,
  sub_folder,
  type,
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [reportAction, setReportAction] = useState<string | null>(null);
  const [docId, setDocId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAllDocumentAssignment({
      project_id: project.payload.id,
      category: category,
      folder: folder,
      sub_folder: sub_folder,
      type: type,
    });
    fetchUsers();
  }, [
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
  const project_id = parseInt(path.split('/')[2]);

  const handleReportAction = (action: string) => {
    console.log("Action", action);
    setReportAction(action);

    setTimeout(() => {
      setIsModalVisible(true);
    }, 0);

    // Log current state (may not immediately reflect updated state due to closure scope)
    console.log("Report Action State:", action);
    console.log("Modal Visibility State:", true);
  };


  console.log("outside", reportAction, isModalVisible);


  const Remove = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllDocumentAssignment({
          project_id: project.payload.id,
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

  useEffect(() => {
    const defaultColumns = [
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
        key: "current_status",
        width: "100px",
        dataIndex: "current_status",
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
            {users.payload.find((e) => e.id === record.author)?.full_name}
          </span>
        ),
      },
      {
        title: "Revied By",
        key: "reviewed_by",
        dataIndex: "reviewed_by",
        width: "100px",
        render: (value: any, record: any) => (
          <span>
            {record && record.DocumentStatuses && record.DocumentStatuses[0] && record.DocumentStatuses[0].reviewed_by
              ? users.payload.find((e) => e.id === record.DocumentStatuses[0].reviewed_by)?.full_name
              : ''}
          </span>
        ),
      },
      {
        title: "Approved By",
        key: "approved_by",
        dataIndex: "approved_by",
        width: "100px",
        render: (value: any, record: any) => (
          <span>
            {record && record.DocumentStatuses && record.DocumentStatuses[0] && record.DocumentStatuses[0].approved_by
              ? users.payload.find((e) => e.id === record.DocumentStatuses[0].approved_by)?.full_name
              : ''}
          </span>
        ),
      },
      {
        title: "Authorized/Rejected By",
        key: "authorized_by",
        dataIndex: "authorized_by",
        width: "100px",
        render: (value: any, record: any) => (
          <span>
            {record && record.DocumentStatuses && record.DocumentStatuses[0] && record.DocumentStatuses[0].authorized_by
              ? users.payload.find((e) => e.id === record.DocumentStatuses[0].authorized_by)?.full_name
              : ''}
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
              onClick={() => DownloadFile(record.document, `${record.document_name}_${record.requested_status}_${record.revision}`)}
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
          <>
            <Popover
              placement="rightTop"
              overlayClassName="action-popover"
              trigger="focus"
              content={
                <div className="d-flex flex-column">
                  {/* <EditSharedComponent document_assignment={record} category={category} folder={folder} sub_folder={sub_folder} type={type} selected={undefined} /> */}
                  {record?.DocumentStatuses?.[0]?.authorized_by == null && (
                    <StatusChangeRequestComponent
                      category={category}
                      folder={folder}
                      sub_folder={sub_folder}
                      type={type}
                      document_assignment={record}
                    />)}
                  <RFIComponent documentId={record.id} />
                  <Popover
                    onclick={() => setDocId(record.id)}
                    placement="left"
                    content={
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button
                          style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
                          onClick={() => handleReportAction("clash_detection_report")}
                          icon={<QuestionOutlined />}
                        >
                          Clash Detection Report
                        </Button>
                        <Button
                          style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
                          onClick={() => handleReportAction("model_quality_check_report")}
                          icon={<QuestionOutlined />}
                        >
                          Model Quality Check Report
                        </Button>
                        <Button
                          style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
                          onClick={() => handleReportAction("progress_report")}
                          icon={<QuestionOutlined />}
                        >
                          Progress Report
                        </Button>
                      </div>
                    }
                    trigger="click"
                  >
                    <Button icon={<QuestionOutlined />}>Report</Button>
                  </Popover>



                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to remove this document?"
                    onConfirm={() => Remove(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    {/* <Button
                      danger
                      type="text"
                      icon={<DeleteColumnOutlined />}
                    >
                      Delete
                    </Button> */}
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
    ];

    // Initialize visible columns with default column keys
    setVisibleColumns(defaultColumns.map(col => col.key).filter(Boolean) as string[]);
    setColumns(defaultColumns);
  }, [users]);

  const handleMenuClick = (e: any) => {
    const { key } = e;
    if (key === "reset") {
      setVisibleColumns(columns.map((col) => col.key));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {columns.map((col) => (
        <Menu.Item key={col.key}>
          <Checkbox
            onChange={(e: any) => {
              const { checked } = e.target;
              setVisibleColumns((prevVisibleColumns) =>
                checked
                  ? [...prevVisibleColumns, col.key]
                  : prevVisibleColumns.filter((key) => key !== col.key)
              );
            }}
            checked={visibleColumns.includes(col.key)}
          >
            {col.title}
          </Checkbox>
        </Menu.Item>
      ))}
      <Menu.Item key="reset">
        <Button type="link">Reset</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent
          onClick={() =>
            fetchAllDocumentAssignment({
              project_id: project.payload.id,
              category: category,
              folder: folder,
              sub_folder: sub_folder,
              type: type,
            })
          }
        />

        <Dropdown overlay={menu}>
          <Button>
            <SettingOutlined /> Columns Visibility
          </Button>
        </Dropdown>
      </div>
      {reportAction && (
        <AttachQualityReportComponent
          type={type}
          action={reportAction}
          onClose={() => setReportAction(null)}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          documentId={docId}
        />
      )}
      <div className="col-md-12">
        <Table
          columns={columns.filter((col) => visibleColumns.includes(col.key))}
          dataSource={document_assignment.payload
            // Map each element to include its DocumentStatuses array
            .map((item: any) => {
              return {
                ...item,
                DocumentStatuses: item.DocumentStatuses.filter((status: any) => status.type_on_status === 'Shared')
              };
            })
            // Filter out elements whose DocumentStatuses array is empty
            .filter((item: any) => item.DocumentStatuses.length > 0)
            .filter(
              (e) => e.project_id === project_id && e.sub_folder === sub_folder
            )
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
  document_assignment: state.document_assignment.fetchAll,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SharedComponent);
