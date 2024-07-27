import { Button, Popconfirm, Popover, Table } from "antd";
import { toNumber } from "lodash";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllScheduleMeeting } from "../../../../../redux/ScheduleMeeting/ScheduleMeeting.action";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { ErrorHandler } from "../../../../../utilities/utilities";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import { ScheduleMeetingPropType, deleteData } from "./util/ScheduleMeeting.util";
import {
  MoreOutlined,
  DeleteColumnOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import AddSMComponent from "./components/Add/AddSM.component";
import EditSMComponent from "./components/Edit/EditSM.component";

const ScheduleMeetingComponent: FC<ScheduleMeetingPropType> = ({
  project,
  users,
  schedule_meeting,
  fetchAllScheduleMeeting,
  fetchUsers,
  tab,
}) => {
  const [meetingData, setMeetingData] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchAllScheduleMeeting({
      project_id: project.payload.id,
    });
  }, [fetchAllScheduleMeeting, fetchUsers, project, tab]);

  useEffect(() => {
    setMeetingData(
      schedule_meeting.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
        participants: item.participants?.split(",").map((item: any) => toNumber(item)),
      }))
    );
  }, [schedule_meeting]);

  const Remove = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllScheduleMeeting({
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
            fetchAllScheduleMeeting({
              project_id: project.payload.id,
            })
          }
        />
        <AddSMComponent />
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
              title: "Subject",
              key: "subject",
              width: "150px",
              dataIndex: "subject",
            },
            {
              title: "Ajenda",
              key: "ajenda",
              width: "150px",
              dataIndex: "ajenda",
            },
            {
              title: "Date",
              key: "date",
              width: "100px",
              dataIndex: "date",
            },
            {
              title: "Time",
              key: "time",
              width: "100px",
              dataIndex: "time",
            },
            {
              title: "Place",
              key: "place",
              width: "100px",
              dataIndex: "place",
            },
            {
              title: "Scheduled By",
              key: "scheduled_by",
              dataIndex: "scheduled_by",
              width: "100px",
              render: (value: any, record: any) => (
                <span>
                  {users.payload.find((e) => e.id === record.scheduled_by)?.full_name}
                </span>
              ),
            },
            {
              title: "Participants",
              key: "participants",
              dataIndex: "participants",
              width: "100px",
              render: (value: any, record: any) => (
                <ul className="pl-1">
                  {record.participants?.map((item: any, index: number) => (
                    <li key={index}>
                      {
                        users.payload.find((e) => e.id === toNumber(item))
                          ?.full_name
                      }
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "Minute File",
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
                        onClick={() => DownloadFile(record.document)}
                      ></Button>

                      <DocumentViewerComponent document={record.document} />
                    </>
                  ) : null}
                </div>
              ),
            },
            {
              title: "Remark",
              key: "remark",
              width: "300px",
              dataIndex: "remark",
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
                        <EditSMComponent schedule_meeting={record} />
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove this schedule meeting?"
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
          dataSource={meetingData}
          loading={schedule_meeting.isPending}
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
  schedule_meeting: state.schedule_meeting.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllScheduleMeeting: (action: any) =>
    dispatch(fetchAllScheduleMeeting(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleMeetingComponent);
