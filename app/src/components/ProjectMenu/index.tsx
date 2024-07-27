import { Card, Tabs } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RouteConstants } from "../../router/Constants";
import DocumentAssignmentComponent from './DocumentAssignment';
import ProjectAssignmentComponent from './ProjectAssignment';
import CommunicationComponent from './Communication';
import ReportsComponent from './Reports';
import ProjectDetailsComponent from './ProjectDetails/index';

const ProjectMenuComponent: FC<{}> = () => {
  const history = useHistory();
  const { id: projectId } = useParams<{ id: string }>();

  const handleTabChange = (key: string) => {
    if (projectId) {
      history.push(RouteConstants.PROJECT.replace(':id', projectId).replace(':tab', key));
    }
  };

  return (
    <>
      <Card className="inventory">
        <Tabs
          type="card"
          defaultActiveKey="document"
          onChange={handleTabChange}
          items={[
            {
              key: "user-assign",
              label: "User Assignment",
              children: <ProjectAssignmentComponent />,
            },
            {
              key: "document",
              label: "Document",
              children: <DocumentAssignmentComponent />,
            },
            {
              key: "report",
              label: "Report",
              children: <ReportsComponent />,
            },
            {
              key: "communication",
              label: "Communication",
              children: <CommunicationComponent />,
            },
            {
              key: "project-details",
              label: "Project Details",
              children: <ProjectDetailsComponent />,
            },
          ]}
        />
      </Card>
    </>
  );
};

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenuComponent);
