import { Button, Table, Form, Modal, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllDocuments } from "../../../../../redux/Document/Document.action";
import { getUserData } from "../../../../../utilities/utilities";
import { ShareAltOutlined } from "@ant-design/icons";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { fetchAllSharedDocuments } from "../../../../../redux/SharedDocument/SharedDocument.action";
import { sendData, ShareDocumentPropType } from "./ShareDocument.util";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";

const ShareDocumentComponent: FC<ShareDocumentPropType> = ({
  fetchAllDocuments,
  fetchAllUser,
  fetchAllSharedDocuments,
  sharedDocuments,
  users,
  document,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    users.payload.length === 0 && fetchAllUser();
    fetchAllSharedDocuments({ document_id: document.id });
  }, [fetchAllSharedDocuments]);

  useEffect(() => {
    if (!isModalVisible) {
      resetForm();
      fetchAllSharedDocuments({ user_id: getUserData().id });
    } else fetchAllSharedDocuments({ document_id: document.id });
  }, [isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const resetForm = () => {
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);

    let parsedData = value.shared_users.map((user_id: any) => {
      return { user_id, document_id: document.id };
    });

    sendData(parsedData)
      .then((res) => {
        console.log(res.data);
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllDocuments();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SHARED_DOCUMENT_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SHARED_DOCUMENT_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary mr-3"
        icon={<ShareAltOutlined />}
        onClick={() => setIsModalVisible(true)}
        disabled={!document.is_private}
      >
        Share
      </Button>

      <Modal
        title="Share Document"
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[]}
      >
        <>
          <Form form={form} onFinish={Submit} layout="vertical">
            <div className="row">
              <div className="col-md-10">
                <Form.Item name="shared_users" label="Add Users">
                  <Select mode="multiple">
                    {users.payload.map((user) => (
                      <Select.Option value={user.id}>
                        {user.full_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-2">
                <Form.Item label=" ">
                  <Button
                    className="btn-outline-secondary"
                    icon={<ShareAltOutlined />}
                    onClick={() => form.submit()}
                    loading={loading}
                  >
                    Share
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>

          <div className="row mt-3">
            <div className="text-center col-md-12">
              <h6 style={{ color: "gray" }}>Shared Users for this Document</h6>
            </div>
            <div className="col-md-10">
              <Table
                loading={sharedDocuments.isPending}
                columns={[
                  {
                    title: "No.",
                    render: (value, record, index) => index + 1,
                  },
                  {
                    title: "User",
                    dataIndex: "full_name",
                  },
                ]}
                dataSource={sharedDocuments.payload.map(({ user }, index) => {
                  return {
                    full_name: user?.full_name,
                    key: index,
                  };
                })}
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  allDocuments: state.document.fetchAll,
  users: state.user.fetchAll,
  sharedDocuments: state.sharedDocument.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllDocuments: () => dispatch(fetchAllDocuments()),
  fetchAllUser: () => dispatch(fetchAllUser()),
  fetchAllSharedDocuments: (data: any) =>
    dispatch(fetchAllSharedDocuments(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareDocumentComponent);
