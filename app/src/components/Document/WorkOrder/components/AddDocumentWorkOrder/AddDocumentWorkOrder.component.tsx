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
import {
  AddDocumentWorkOrderPropType,
  DocumentTableDatatype,
  sendData,
} from "./AddDocumentWorkOrder.util";
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
const AddDocumentWorkOrderComponent: FC<AddDocumentWorkOrderPropType> = ({
  fetchDocumentWorkOrder,
  fetchStaff,
  staff,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attached_documents, setAttachedDocuments] = useState<
    DocumentTableDatatype[]
  >([{ key: 1, remark: "", document: null, type: "", name: "" }]);
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submit = (value: any) => {
    let formData = new FormData();
    let document_data: any = [];
    formData.append(
      "staffs",
      JSON.stringify(value.assigned_to.map((e: any) => ({ id: e })))
    );
    formData.append("name", value.name);
    formData.append("description", value.description);
    formData.append("assigned_by", value.assigned_by);
    formData.append("due_date", value.due_date.format("YYYY-MM-DD"));
    formData.append("type", value.type);
    formData.append("remark", value.remark);
    attached_documents.forEach((e) => {
      formData.append("file", e.document);
      document_data.push({
        remark: e.remark,
        name: e.name,
        type: e.type,
        document_name: e.document?.name,
      });
    });

    formData.append("document", JSON.stringify(document_data));

    setLoading(true);
    sendData(formData)
      .then((res) => {
        setLoading(false);
        form.resetFields();
        setAttachedDocuments([
          { key: 0, document: null, name: "", remark: "", type: "" },
        ]);
        handleOk();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DOCUMENT_UPLOAD_SUCCESS,
          ""
        );
        fetchDocumentWorkOrder();
      })
      .catch((error) => {
        setLoading(false);

        error.response?.data?.errors?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DOCUMENT_UPLOAD_FAILED,
            e.message
          )
        );
      });
  };

  const setValue = (id: number, name: string, value: any) => {
    const newData = [...attached_documents];
    const selected_index = newData.findIndex((e) => e.key === id);

    if (selected_index !== -1) {
      let selected = newData[selected_index];
      selected = { ...selected, [name]: value };
      newData.splice(selected_index, 1, selected);
      setAttachedDocuments(newData);
    }
  };

  const remove = (key: number) => {
    const newData = [...attached_documents];
    const selected_index = newData.findIndex((e) => e.key === key);
    if (selected_index !== -1 && newData.length > 1) {
      newData.splice(selected_index, 1);
      setAttachedDocuments(newData);
    }
  };

  useEffect(() => {
    if (isModalVisible) fetchStaff();
  }, [isModalVisible, fetchStaff]);

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register WorkOrder
      </Button>
      <Modal
        style={{ top: 10 }}
        width={1300}
        title="Register WorkOrder"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
              loading={loading}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={submit} form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Name"
                rules={[{ required: true, message: "Please input Name" }]}
                name="name"
              >
                <Input placeholder="name" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Description"
                rules={[
                  { required: true, message: "Please input Description" },
                ]}
                name="description"
              >
                <Input placeholder="name" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Due Date"
                rules={[{ required: true, message: "Please input Due Date" }]}
                name="due_date"
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Type"
                rules={[{ required: true, message: "Please input Type" }]}
                name="type"
              >
                <Select placeholder="Please select">
                  {DOCUMENT_WORK_ORDER_TYPE.map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Assigned By"
                rules={[
                  { required: true, message: "Please input Assigned_by" },
                ]}
                name="assigned_by"
              >
                <Select placeholder="Please select">
                  {staff.payload.map((e) => (
                    <Select.Option key={e.id} value={e.id}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Assigned To"
                rules={[
                  { required: true, message: "Please input Assigned To" },
                ]}
                name="assigned_to"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                >
                  {staff.payload.map((e) => (
                    <Select.Option key={e.id} value={e.id}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Remark"
                rules={[{ required: false }]}
                name="remark"
              >
                <Input.TextArea rows={3} placeholder="remark" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Document Name</th>
                    <th>Document Type</th>
                    <th>Remark</th>
                    <th>Document</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attached_documents.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Input
                          value={item.name}
                          onChange={(e) =>
                            setValue(item.key, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Select
                          placeholder="Select"
                          style={{ width: "100%" }}
                          value={item.type}
                          onChange={(e) => setValue(item.key, "type", e)}
                        >
                          {DOCUMENT_TYPE.map((e, index) => (
                            <Select.Option key={index} value={e}>
                              {e}
                            </Select.Option>
                          ))}
                        </Select>
                      </td>
                      <td>
                        <Input.TextArea
                          value={item.remark}
                          onChange={(e) =>
                            setValue(item.key, "remark", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Upload
                          name="file"
                          beforeUpload={() => {
                            return false;
                          }}
                          type="select"
                          multiple={false}
                          onChange={(e) =>
                            setValue(item.key, "document", e.file)
                          }
                        >
                          <Button style={{ width: "100%" }}>
                            <UploadOutlined /> Click to Upload
                          </Button>
                        </Upload>
                      </td>
                      <td>
                        <Button onClick={() => remove(item?.key)}>-</Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      <Button
                        onClick={() =>
                          setAttachedDocuments([
                            ...attached_documents,
                            {
                              key: Date.now(),
                              remark: "",
                              document: null,
                              name: "",
                              type: "",
                            },
                          ])
                        }
                        style={{ width: "50%" }}
                      >
                        +
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
