import { Button, Popconfirm, Popover, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../../../../../../../constants/Constants";
import { fetchAllDocumentAssignment } from "../../../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { ErrorHandler, getUserData } from "../../../../../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../../../../../common/Notification/Notification.component";
import { ActionStatusPropType, approvedData } from "../../util/WIP.util";
import { MoreOutlined, DeleteColumnOutlined } from "@ant-design/icons";

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
  const [showButtons, setShowButtons] = useState(false); // State to track if actual buttons should be shown

  const onButtonClick = () => {
    setShowButtons(true); // Set showButtons to true when More button is clicked
  };

  const onApprove = (id: number | string, type: string) => {
    setLoading(true);
    const datas = {
      id: String(id), // Convert id to string
      type: type,
    };
    approvedData(datas)
      .then(() => {
        setLoading(false);
        fetchAllDocumentAssignment({
          project_id: project.payload.id,
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type: type,
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
          category: category,
          folder: folder,
          sub_folder: sub_folder,
          type: type,
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

  return (
    <>
      <Popover placement="rightTop"
        overlayClassName="action-popover"
        trigger="focus"
        content={
          <div className="d-flex flex-column">
            <><Popconfirm
              placement="leftTop"
              title="Are you sure you want to approve that?"
              onConfirm={() => onApprove(document_assignment.id, "Shared")}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ color: 'green' }}
                type="text"
                loading={loading}

              >
                Approve
              </Button>
            </Popconfirm><Popconfirm
              placement="leftTop"
              title="Are you sure you want to reject that?"
              onConfirm={() => onReject(document_assignment.id, true)}
              okText="Yes"
              cancelText="No"
            >
                <Button
                  danger
                  type="text" // Set type to "text"
                  loading={loading}
                >
                  Reject
                </Button>
              </Popconfirm></>
          </div>

        }
      >
        <Button
          icon={<MoreOutlined />}
          className="btn-outline-secondary border-0"
        ></Button>
      </Popover >

    </>

  );
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
