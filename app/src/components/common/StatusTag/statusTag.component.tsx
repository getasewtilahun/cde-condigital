import { Tag } from "antd";
import React from "react";
import { Status } from "../../../constants/Constants";

const StatusTag = (status: number, type: string) => {
  if (type !== "View") {
    switch (status) {
      case Status.PENDING:
        return (
          <Tag color="yellow" className="print-tag">
            Pending
          </Tag>
        );
      case Status.REVISE:
        return (
          <Tag color="yellow" className="print-tag">
            Revise
          </Tag>
        );
      case Status.APPROVED:
        return type === "Check" ? (
          <Tag color="green" className="print-tag">
            Checked
          </Tag>
        ) : (
          <Tag color="green" className="print-tag">
            Approved
          </Tag>
        );
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default StatusTag;
