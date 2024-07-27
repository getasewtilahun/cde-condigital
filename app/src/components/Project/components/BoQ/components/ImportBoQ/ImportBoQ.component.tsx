import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import { UploadOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import Upload from "antd/lib/upload";
import { ImportBoQPropType } from "./ImportBoQ.util";
import { useForm } from "antd/lib/form/Form";
import * as XLSX from "xlsx";
import { Select } from "antd";
import {
  parseBoQExcel,
  readExcel,
} from "../../../../../../../utilities/utilities";
const ImportBoQComponent: FC<ImportBoQPropType> = ({
  setData,
  setTab,
  type,
  next,
  project_information,
  setProjectData,
}) => {
  const [showModal, setIsModalVisible] = useState(false);
  const [excel_data, setExcelData] = useState<XLSX.WorkBook>();
  const [form] = useForm();
  const fileChecker = (rule: any, value: any) => {
    if (value === undefined) return Promise.reject("Please input File !");
    else if (value.fileList.length > 1) {
      return Promise.reject("Can not import multiple files");
    }
    return Promise.resolve();
  };

  const resetForm = () => {
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFileSelect = (file: any) => {
    readExcel(file).then((workbook) => {
      setExcelData(workbook);
    });
    return false;
  };

  const submit = (value: any) => {
    if (type === "attach") {
      setProjectData({
        ...project_information,
        sheet_names: value.sheet_name,
        file: value.file.file,
        boqs: [],
      });
      next();
    } else {
      const parsed = parseBoQExcel(excel_data, value.sheet_name);
      setData(parsed);
      resetForm();
      setTab(parsed[0]?.sheet_name);
    }

    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={() => setIsModalVisible(true)}>
        {type === "attach" ? "Attach a BoQ" : "Import from Excel"}
      </Button>
      <Modal
        title="Import Excel"
        visible={showModal}
        onCancel={() => setIsModalVisible(false)}
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
        <Form layout="vertical" form={form} onFinish={submit}>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="File"
                name="file"
                rules={[{ validator: fileChecker, required: true }]}
              >
                <Upload
                  accept=".xls,.xlsx"
                  name="file"
                  beforeUpload={onFileSelect}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button>
                    <UploadOutlined /> Select a File
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Sheet Name"
                name="sheet_name"
                rules={[{ required: true, message: "Sheet Name Required!" }]}
              >
                <Select
                  placeholder="Select"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                >
                  {excel_data?.SheetNames.map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ImportBoQComponent;
