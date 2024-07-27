import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllProject } from "../../redux/Project/Project.action";
import { DELETE, ProjectPropType } from "./utils/Project.util";
import { OpenNotification } from "../common/Notification/Notification.component";
import { NotificationType } from "../../constants/Constants";
import { ErrorHandler, format, getUserData } from "../../utilities/utilities";
import ReloadButtonComponent from "../common/ReloadButton/ReloadButton.component";
import AddProjectComponent from "./components/Add/AddProject.component";
import { Project } from "../../redux/Project/Project.type";
import { useHistory } from "react-router";
import { RouteConstants } from "../../router/Constants";
import { fetchAllUserAssignment } from "../../redux/UserAssignment/UserAssignment.action";

const ProjectComponent: FC<ProjectPropType> = ({
  fetchProjects,
  fetchUserAssignments,
  projects,
  userAssignments
}) => {
  const [loading, setLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const currentUser = getUserData().id;

  useEffect(() => {
    fetchProjects();
    fetchUserAssignments();
  }, [fetchProjects, fetchUserAssignments]);

  console.log("curent user id", currentUser);

  useEffect(() => {
    if (currentUser && userAssignments.payload.length > 0) {
      const assignedProjectIds = userAssignments.payload
        .filter((assignment: any) => assignment.assigned_id == currentUser)
        .map((assignment: any) => assignment.project_id);

      const filtered = projects.payload.filter((project: Project) =>
        project.user_id == currentUser || assignedProjectIds.includes(project.id)
      );

      // Sort the projects by createdAt
      const sorted = filtered.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setFilteredProjects(sorted);
    }
  }, [projects, userAssignments, currentUser]);


  const history = useHistory();


  const onDelete = (id: any) => {
    DELETE(id)
      .then(() => {
        fetchProjects();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Project Removed", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove Project",
            e.message
          )
        );
      });
  };

  const onClickHandler = (record: Project, tab: string) => {
    history.push(RouteConstants.PROJECT.replace(':id', record.id.toString()).replace(':tab', tab));
  };

  return (
    <Card>
      <div className="row">
        <div className="col-md-12">
          <AddProjectComponent />
          <ReloadButtonComponent onClick={() => fetchProjects()} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            loading={projects.isPending}
            dataSource={filteredProjects.map((project, index) => ({
              ...project,
              key: index + 1,
            }))}
            columns={[
              {
                title: "No",
                key: "no",
                dataIndex: "key",
                onCell: (record: any, rowIndex: any) => {
                  return {
                    onClick: (event: any) => onClickHandler(record, 'document'),
                  };
                },
              },
              {
                title: "Name",
                key: "name",
                dataIndex: "name",
                onCell: (record: any, rowIndex: any) => {
                  return {
                    onClick: (event: any) => onClickHandler(record, 'document'),
                  };
                },
              },
              {
                title: "Code",
                key: "code",
                dataIndex: "code",
                onCell: (record: any, rowIndex: any) => {
                  return {
                    onClick: (event: any) => onClickHandler(record, 'document'),
                  };
                },
              },
              {
                title: "Project Type",
                key: "project_type",
                dataIndex: "project_type",
                onCell: (record: any, rowIndex: any) => {
                  return {
                    onClick: (event: any) => onClickHandler(record, 'document'),
                  };
                },
              },
              {
                title: "Contract Type",
                key: "contract_type",
                dataIndex: "contract_type",
                onCell: (record: any, rowIndex: any) => {
                  return {
                    onClick: (event: any) => onClickHandler(record, 'document'),
                  };
                },
              },
              {
                title: "Budget",
                key: "budget",
                dataIndex: "project_budget",
                render: (value: any) => format(value),
                onCell: (record: any, rowIndex: any) => {
                  return {
                    onClick: (event: any) => onClickHandler(record, 'document'),
                  };
                },
              },
              {
                title: "Action",
                render: (value: any, record: any) => (
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <AddProjectComponent project={record} />
                        <Popconfirm
                          title="Are you sure to delete this Item?"
                          onConfirm={() => onDelete(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            loading={loading}
                            type="text"
                            icon={<DeleteOutlined />}
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
            ]}
          />
        </div>
      </div>
    </Card>
  );
};


const mapStateToProps = (state: any) => ({
  projects: state.project.fetchAll,
  userAssignments: state.user_assignment.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: () => dispatch(fetchAllProject()),
  fetchUserAssignments: () => dispatch(fetchAllUserAssignment()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);
