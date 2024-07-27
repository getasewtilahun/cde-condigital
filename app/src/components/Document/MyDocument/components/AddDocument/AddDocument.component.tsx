import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import AutoComplete from "antd/lib/auto-complete";
import { FC, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { AddDocumentPropType, sendData } from "./AddDocument.util";
import { connect } from "react-redux";
import { fetchAllProjects } from "../../../../../redux/Project/Project.action";
import {
  DOCUMENT_TYPE,
  Message,
  NotificationType,
} from "../../../../../constants/Constants";
import Upload from "antd/lib/upload";

import { UploadOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { fetchAllDocuments } from "../../../../../redux/Document/Document.action";
import { ErrorHandler } from "../../../../../utilities/utilities";
const AddDocumentComponent: FC<AddDocumentPropType> = ({
  fetchProjects,
  project,
  fetchDocument,
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

  const submit = (value: any) => {
    let formData = new FormData();
    formData.append("name", value.name);
    formData.append("type", value.type);
    formData.append(
      "project_id",
      value.project_id !== -1 ? value.project_id : ""
    );
    formData.append("file", value.file.file);
    setLoading(true);
    sendData(formData)
      .then(() => {
        setLoading(false);
        form.resetFields();
        handleOk();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DOCUMENT_UPLOAD_SUCCESS,
          ""
        );
        fetchDocument();
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DOCUMENT_UPLOAD_FAILED,
            e.message
          )
        );
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Upload Document
      </Button>
      <Modal
        style={{ top: 10 }}
        title="Upload Document"
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
            <div className="col-md-12">
              <Form.Item
                label="Name"
                rules={[{ required: true, message: "Please input Name" }]}
                name="name"
              >
                <Input placeholder="name" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Document Type"
                rules={[{ required: true, message: "Please input Type" }]}
                name="type"
              >
                <AutoComplete
                  options={DOCUMENT_TYPE.map((e, index) => {
                    return {
                      key: index,
                      level: e,
                      value: e,
                    };
                  })}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                >
                  <Input />
                </AutoComplete>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Document Of"
                rules={[{ required: true, message: "Please input Project" }]}
                name="project_id"
              >
                <Select placeholder="Select">
                  <Select.Option value={-1}>Company</Select.Option>
                  {project.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button style={{ width: "100%" }}>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
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
  project: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: () => dispatch(fetchAllProjects()),
  fetchDocument: () => dispatch(fetchAllDocuments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDocumentComponent);
