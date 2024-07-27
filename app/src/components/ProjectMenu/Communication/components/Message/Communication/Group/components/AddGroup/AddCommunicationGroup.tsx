import {
  LoadingOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../../../constants/Constants";
import { fetchAllCommunicationGroup } from "../../../../../../../../../redux/CommunicationGroup/CommunicationGroup.action";
import { ErrorHandler } from "../../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../../common/Notification/Notification.component";
import {
  AddCommunicationGroupPropType,
  sendData,
} from "./AddCommunicationGroup.util";

const AddCommunicationGroupComponent: FC<AddCommunicationGroupPropType> = ({
  fetchAllCommunicationGroup,
  communication_groups,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    const data = {
      ...value,
    };

    sendData(data)
      .then(() => {
        setLoading(false);
        form.resetFields();
        handleOk();
        fetchAllCommunicationGroup();
        OpenNotification(
          NotificationType.SUCCESS,
          "Group created successfully!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to create group",
            e.message
          )
        );
      });
  };

  return (
    <>
      {loading || communication_groups.isPending ? (
        <LoadingOutlined />
      ) : (
        <Tooltip title={"Add new group"} placement="rightTop">
          <Button
            type="primary"
            style={{ height: "32px" }}
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          ></Button>
        </Tooltip>
      )}

      <Modal
        centered
        className="fixed-modal"
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
              Register
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                className="mb-0"
                label="Group Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Group name is required!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={2}
                  style={{ resize: "none" }}
                  placeholder="enter..."
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
  communication_groups: state.communication_group.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCommunicationGroup: () => dispatch(fetchAllCommunicationGroup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommunicationGroupComponent);
