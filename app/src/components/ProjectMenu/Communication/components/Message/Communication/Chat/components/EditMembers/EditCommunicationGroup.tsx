import { UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../../../constants/Constants";
import {
  fetchAllCommunicationGroupUser,
  fetchAllCommunicationGroupUserReset,
} from "../../../../../../../../../redux/CommunicationGroup/CommunicationGroup.action";
import { ErrorHandler, searchProp } from "../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../common/Notification/Notification.component";
import {
  EditCommunicationGroupPropType,
  parseData,
  sendData,
} from "./EditCommunicationGroup.util";

const EditCommunicationGroupComponent: FC<EditCommunicationGroupPropType> = ({
  selected_group,
  fetchAllCommunicationGroupUser,
  fetchAllCommunicationGroupUserReset,
  communication_group_users,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      fetchAllCommunicationGroupUser({
        communication_group_id: selected_group.id,
      });
    } else {
      fetchAllCommunicationGroupUserReset();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (
      !communication_group_users.isPending &&
      communication_group_users.isSuccessful
    ) {
      const values = communication_group_users.payload.map((e: any) => e.user_id);

      form.setFieldsValue({
        user_ids: values,
      });
    }
  }, [communication_group_users]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    const data = parseData(
      selected_group.id,
      value.user_ids,
      communication_group_users.payload
    );

    sendData(data)
      .then(() => {
        setLoading(false);
        handleOk();
        form.resetFields();
        OpenNotification(
          NotificationType.SUCCESS,
          "Group members updated successfully!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to update group members",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Tooltip title={"Edit group members"} placement="leftTop">
        <Button
          icon={<UsergroupAddOutlined />}
          className="btn-outline-secondary"
          onClick={() => setIsModalVisible(true)}
        ></Button>
      </Tooltip>

      <Modal
        centered
        className="fixed-modal"
        title=""
        open={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Group Members"
                name="user_ids"
                rules={[
                  {
                    required: true,
                    message: "Select at least on member!",
                  },
                ]}
              >
                <Select
                  loading={
                    users.isPending || communication_group_users?.isPending
                  }
                  options={users.payload.map((e: any) => ({
                    label: e.full_name,
                    value: e.id,
                  }))}
                  showSearch={true}
                  mode="multiple"
                  optionFilterProp={"children"}
                  filterOption={(input: any, option: any) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  className="w-100"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
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
  users: state.user.fetchAll,
  communication_group_users: state.communication_group.fetchAllUsers,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCommunicationGroupUser: (payload: any) =>
    dispatch(fetchAllCommunicationGroupUser(payload)),
  fetchAllCommunicationGroupUserReset: () =>
    dispatch(fetchAllCommunicationGroupUserReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommunicationGroupComponent);
