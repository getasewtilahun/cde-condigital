import { Button, Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";

import { InfoCircleOutlined } from "@ant-design/icons";
import { AddRemarkPropType } from "../../BoQ.util";

const AddRemarkComponent: FC<AddRemarkPropType> = ({ setValue, value }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (data: any) => {
    setValue(value.key, "remark", data.remark);
    form.resetFields();
    handleOk();
  };

  return (
    <>
      <Button
        type="link"
        icon={<InfoCircleOutlined />}
        onClick={() => setIsModalVisible(true)}
      ></Button>
      <Modal
        style={{ top: 10 }}
        title="Register Remark"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ remark: value.remark ? value.remark : "" }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ message: "Remark Required!", required: true }]}
              >
                <Input.TextArea rows={4} placeholder="remark" />
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemarkComponent);
