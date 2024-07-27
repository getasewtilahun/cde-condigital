import { Button, Form, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { AttachQualityReportPropType } from "../../util/ReviewForApproval.util";

const AttachQualityReportComponent: FC<AttachQualityReportPropType> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
    };

    /*   sendData(data)
          .then(() => {
            handleOk();
            setLoading(false);
            OpenNotification(
              NotificationType.SUCCESS,
              Message.RESOURCE_SUCCESS,
              ""
            );
          })
          .catch((error) => {
            setLoading(false);
             ErrorHandler(error).map((e: any) =>
              OpenNotification(
                NotificationType.ERROR,
                Message.RESOURCE_FAILED,
                e.message
              )
            );
          });*/
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Attach Quality Report
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={900}
        title="Attach Quality Report"
        visible={isModalVisible}
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
            <div className="col-md-12"></div>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachQualityReportComponent);
