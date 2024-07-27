import { Switch } from "antd";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { fetchAllDocuments } from "../../../../../redux/Document/Document.action";
import { Document } from "../../../../../redux/Document/Document.type";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import {
  UpdateDocumentStatusPropType,
  updateIsPrivate,
} from "./UpdateDocumentStatus.util";

const UpdateDocumentStatusComponent: FC<UpdateDocumentStatusPropType> = ({
  fetchAllDocuments,
  document,
}) => {
  const [loading, setLoading] = useState(false);

  const onMakePublic = (id: number, is_private: boolean) => {
    setLoading(true);

    updateIsPrivate(id, !is_private)
      .then((res) => {
        setLoading(false);
        fetchAllDocuments();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DOCUMENT_STATUS_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DOCUMENT_STATUS_UPDATE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Switch
        loading={loading}
        checkedChildren="Public"
        unCheckedChildren="Private"
        checked={!document.is_private}
        onChange={() => onMakePublic(document.id, document.is_private)}
      />
    </>
  );
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllDocuments: () => dispatch(fetchAllDocuments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateDocumentStatusComponent);
