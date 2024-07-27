import React, { FC, useEffect, useState } from "react";
import { Button, Popconfirm, Popover, Table } from "antd";
import { MoreOutlined, DeleteColumnOutlined } from "@ant-design/icons";
import moment from "moment";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Message, NotificationType } from "../../../constants/Constants";
import { fetchAllUser, fetchAssignedUser } from "../../../redux/User/User.action";
import { fetchAllUserAssignment } from "../../../redux/UserAssignment/UserAssignment.action";
import { fetchRolesFromBackend } from "./util/ProjectAssignment.util"; // Import the fetchRolesFromBackend function
import { ErrorHandler } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import AddAssignmentComponent from "./components/Add/AddAssignment.component";
import { ProjectAssignmentPropType, deleteData } from "./util/ProjectAssignment.util";
import DetailAssignmentComponent from "./components/Detail/DetailAssignment.component";
import EditAssignmentComponent from "./components/Edit/EditAssignment.component";
import { fetchOneProject } from "../../../redux/Project/Project.action";
import { AxiosError } from "axios";

const ProjectAssignmentComponent: FC<ProjectAssignmentPropType> = ({
  fetchUsers,
  project,
  users,
  assigned_users,
  fetchOneProject,
  fetchAssignedUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<{ [key: string]: string }>({}); // State to store roles

  const location = useLocation();
  const path = location.pathname;
  const project_id = path.split('/')[2];

  useEffect(() => {
    fetchAssignedUser({ project_id: parseInt(project_id) })
  }, [fetchAssignedUser])


  // const history = useHistory();
  // const path = history.location;
  // const project_id = path.pathname?.split("/")[2]


  useEffect(() => {
    if (project_id) {
      fetchAssignedUser({ project_id: parseInt(project_id) });
      fetchOneProject(parseInt(project_id));
      fetchUsers();
      fetchRoles(); // Fetch roles when component mounts
    }
  }, [fetchAssignedUser, fetchOneProject, fetchUsers, project_id]);

  // Function to fetch and store roles
  const fetchRoles = async () => {
    try {
      const rolesData = await fetchRolesFromBackend();
      const rolesMap: { [key: string]: string } = {};
      rolesData && rolesData?.forEach((role) => {
        rolesMap[role.id] = role.name;
      });
      setRoles(rolesMap);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const Remove = async (id: number) => {
    setLoading(true);
    try {
      await deleteData(id);
      await fetchAssignedUser({ project_id: project.payload.id });
      OpenNotification(NotificationType.SUCCESS, Message.REMOVE_SUCCESS, "");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        ErrorHandler(error).forEach((e: any) =>
          OpenNotification(NotificationType.ERROR, Message.REMOVE_FAILED, e.message)
        );
      } else {
        OpenNotification(NotificationType.ERROR, Message.REMOVE_FAILED, "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("data from index", assigned_users.payload, assigned_users.error)

  const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
  };

  console.log("fetch one project", project.payload)

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "assigned_id",
      render: (assigned_id: string) => (
        <span>
          {users.payload.find((e: any) => e.id === assigned_id)?.full_name}
        </span>
      ),
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "assigned_id",
      render: (assigned_id: string) => {
        const user = users.payload.find((e: any) => e.id === assigned_id);
        console.log('User:', user);
        if (user && user.user_role) {
          return user.user_role.name;
        }
        return 'Unknown';
      },
    },

    {
      title: "Assigned Date",
      key: "assigned_date",
      render: (record: any) => moment(record.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      width: "150px",
      fixed: "right",
      render: (record: any) => (
        <Popover
          placement="rightTop"
          overlayClassName="action-popover"
          trigger="focus"
          content={
            <div className="d-flex flex-column">
              {/* <DetailAssignmentComponent id={record.id} /> */}
              {/* <EditAssignmentComponent id={record.id} /> */}
              <Popconfirm
                placement="leftTop"
                title="Are you sure you want to remove user assignment?"
                onConfirm={() => Remove(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="text" icon={<DeleteColumnOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          }
        >
          <Button icon={<MoreOutlined />} className="btn-outline-secondary border-0"></Button>
        </Popover>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AddAssignmentComponent project={project.payload} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <Table
            columns={columns}
            pagination={false}
            dataSource={assigned_users.payload}
            loading={assigned_users.isPending}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  assigned_users: state.user_assignment.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchOneProject: (params: any) => dispatch(fetchOneProject(params)),
  fetchAssignedUser: (action: any) => dispatch(fetchAllUserAssignment(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAssignmentComponent);
