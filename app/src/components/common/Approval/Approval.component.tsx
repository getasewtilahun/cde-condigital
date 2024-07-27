import { FC } from "react";
import { Button, Popconfirm, Tag } from "antd";
import { connect } from "react-redux";
import { ApprovalPropType, sortStatusesByPriority } from "./Approval.util";
import { Status } from "../../../constants/Constants";
import { getUserData } from "../../../utilities/utilities";

const ApprovalComponent: FC<ApprovalPropType> = ({ onAction, payload }) => {
  const Render = () => {
    let checked = 0;
    let approved = 0;
    let revised = 0;
    let pending = 0;
    let total_checked = 0;

    const sortedList = sortStatusesByPriority(payload);

    for (let i = 0; i < payload?.length; i++) {
      let e = sortedList[i];

      if (
        e.type === "Check" &&
        e.user_id === getUserData().id &&
        e.status === Status.PENDING
      )
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to Check this Item"
              onConfirm={() => onAction({ status: 1, id: e.id })}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-outline-secondary">Check</Button>
            </Popconfirm>

            <Popconfirm
              placement="leftTop"
              title="Are you sure you want this Item to be revised"
              onConfirm={() => onAction({ status: 2, id: e.id })}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-outline-secondary">Revise</Button>
            </Popconfirm>
          </>
        );

      if (e.status === Status.APPROVED && e.type === "Approve") {
        approved += 1;
      } else if (e.type === "Check") {
        if (e.status === Status.APPROVED) checked += 1;

        total_checked += 1;
      } else if (e.status === Status.PENDING && e.type !== "View") {
        pending += 1;
      } else if (e.status === Status.REVISE) {
        revised += 1;
      }

      if (
        e.type === "Approve" &&
        e.user_id === getUserData().id &&
        e.status === Status.PENDING &&
        total_checked === checked
      )
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to Approve this Item"
              onConfirm={() => onAction({ status: 1, id: e.id })}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" style={{ height: "32px" }}>
                Approve
              </Button>
            </Popconfirm>

            <Popconfirm
              placement="leftTop"
              title="Are you sure you want  this Item to be revised"
              onConfirm={() => onAction({ status: 2, id: e.id })}
              okText="Yes"
              cancelText="No"
            >
              <Button className="ml-1 btn-outline-secondary">Revise</Button>
            </Popconfirm>
          </>
        );
    }

    return (
      <>
        {checked > 0 ? (
          <Tag className="ml-1 mr-1" color={"green"}>
            Checked ({checked})
          </Tag>
        ) : null}
        {approved > 0 ? (
          <Tag className="ml-1 mr-1" color={"green"}>
            Approved ({approved})
          </Tag>
        ) : null}
        {revised > 0 ? (
          <Tag className="ml-1 mr-1" color={"yellow"}>
            Revise ({revised})
          </Tag>
        ) : null}
        {pending > 0 ? (
          <Tag className="ml-1 mr-1" color={"yellow"}>
            Pending ({pending})
          </Tag>
        ) : null}
      </>
    );
  };

  return <div>{Render()}</div>;
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalComponent);
