import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import { FC, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { connect } from "react-redux";

import Upload from "antd/lib/upload";

import { UploadOutlined } from "@ant-design/icons";
import { DetailDocumentWorkOrderPropType } from "./DetailDocumentWorkOrder.util";
import { fetchAllStaffs } from "../../../../../redux/Staff/Staff.action";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import {
  DOCUMENT_TYPE,
  DOCUMENT_WORK_ORDER_TYPE,
  Message,
  NotificationType,
} from "../../../../../constants/Constants";
import { fetchAllDocumentWorkOrders } from "../../../../../redux/DocumentWorkOrder/DocumentWorkOrder.action";
import { DatePicker } from "antd";
import moment from "moment";
const AddDocumentWorkOrderComponent: FC<DetailDocumentWorkOrderPropType> = ({
  data,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Detail</Button>
      <Modal
        style={{ top: 10 }}
        width={1300}
        title="Detail"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form layout="vertical" form={form} initialValues={data}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Name">
                <Input placeholder="name" value={data?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Description">
                <Input value={data?.description} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Due Date">
                <Input value={moment(data?.due_date).format("DD/MM/YYYY")} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Type">
                <Input value={data?.type} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Assigned By" name="assigned_by">
                <Input value={data?.assigned_by_staff?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Assigned To">
                <Input
                  value={data?.assigned_to_staff?.map(
                    (e, index, array) =>
                      `${e.name}${array.length - 1 > index ? ", " : ""}`
                  )}
                />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Remark">
                <Input.TextArea rows={3} value={data?.remark} />
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
  staff: state.staff.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchStaff: () => dispatch(fetchAllStaffs()),
  fetchDocumentWorkOrder: () => dispatch(fetchAllDocumentWorkOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDocumentWorkOrderComponent);
