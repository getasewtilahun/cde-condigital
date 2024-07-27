import { Button, Popconfirm, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../../../../../../../constants/Constants";
import { fetchAllDocumentAssignment } from "../../../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { ErrorHandler, getUserData } from "../../../../../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../../../../../common/Notification/Notification.component";
import { ActionStatusPropType,Property,approvedData } from "../../util/Shared.util";

const ActionStatusComponent: FC<ActionStatusPropType> = ({
  document_assignment,
  project,
  fetchAllDocumentAssignment,
  category,
  folder,
  sub_folder,
  type
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const onApprove = (id: number, type: string) => {
    setLoading(true);
    const datas = {
      id: id,
      type: type,
    };
    approvedData(datas)
      .then(() => {
        setLoading(false);
        fetchAllDocumentAssignment({ 
          project_id: project.payload.id, 
          category:category,
          folder:folder,
          sub_folder:sub_folder,
          type:type,
         });
        OpenNotification(NotificationType.SUCCESS, "Document approved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to approve document",
            e.message
          )
        );
      });
  };

  const onReject = (id: number, reject: boolean) => {
    setLoading(true);
    const datas = {
      id: id,
      reject: reject,
    };
    approvedData(datas)
      .then(() => {
        setLoading(false);
        fetchAllDocumentAssignment({ 
          project_id: project.payload.id, 
          category:category,
          folder:folder,
          sub_folder:sub_folder,
          type:type,
         });
        OpenNotification(
          NotificationType.SUCCESS,
          "Document rejected!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to reject document",
            e.message
          )
        );
      });
  };

  const Render = () => {
    const item: any[] = [];
    if (
        document_assignment.action_by === getUserData().id && !document_assignment.reject
      ) {
      item.push(
        <Popconfirm
        placement="leftTop"
        title="Are you sure you want to approve that?"
        onConfirm={() => onApprove(document_assignment.id, "Published")}
        okText="Yes"
        cancelText="No"
      >
        <Button
          className="ml-1 mr-2"
          style={{ height: "32px" }}
          type="primary"
          loading={loading}
        >
           Approved
        </Button>
      </Popconfirm>
      );
      item.push(
        <Popconfirm
        placement="leftTop"
        title="Are you sure you want to reject that?"
        onConfirm={() => onReject(document_assignment.id, true)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          className="ml-1 mr-2"
          style={{ height: "32px" }}
          type="primary"
          loading={loading}
        >
           Reject
        </Button>
      </Popconfirm>
      );
    } 
    else if (
         document_assignment.reject
      ) {
        item.push(
          <Tag color={"red"} key={item.length}>
            {`Revise and Submit`}
          </Tag>
        );
    }
    else {
      item.push(
        <Tag color={"yellow"}>
          {`Pending`}
        </Tag>
      );
    } 
    return item;
  };

  return <>{Render()}</>;
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllDocumentAssignment: (action: any) =>
    dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionStatusComponent);
