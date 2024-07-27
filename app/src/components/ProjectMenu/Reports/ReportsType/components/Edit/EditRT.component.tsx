import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  consideredDocuments,
  EditRTPropType,
  updateDataWithFile,
  updateDataWithOutFile,
} from "../../util/ReportsType.util";
import { fetchAllReports } from "../../../../../../redux/Reports/Reports.action";
import { Document } from "../../../../../../redux/Document/Document.type";
import {
  Discipline,
  Forms,
  FunctionalBreakdown,
  Originator,
  Spatial,
} from "../../../../DocumentAssignment/components/Model/components/DesingInformation/components/Architectural/components/WIP/util/WIP.util";
import { ErrorHandler, zeroPad } from "../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../constants/Constants";
import moment from "moment";
import { useLocation } from "react-router";
import { toNumber } from 'lodash';

const EditRTComponent: FC<EditRTPropType> = ({
  users,
  project,
  reports,
  type,
  document_assignment,
  fetchAllReports,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consideredDocData, setConsideredDocData] = useState<Document[]>([]);
  const [optionsOriginator, setOptionsOriginator] = useState<
    { value: string }[]
  >([]);
  const [optionsFunctionalBreakdown, setOptionsFunctionalBreakdown] = useState<
    { value: string }[]
  >([]);
  const [optionsSpatial, setOptionsSpatial] = useState<{ value: string }[]>([]);
  const [optionsForms, setOptionsForms] = useState<{ value: string }[]>([]);
  const [optionsDiscipline, setOptionsDiscipline] = useState<
    { value: string }[]
  >([]);
  const [project_code, setProjectCode] = useState("");
  const [originator, setOriginator] = useState("");
  const [functional_breakdown, setFunctionalBreakdown] = useState("");
  const [spatial, setSpatial] = useState("");
  const [forms, setForms] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [number_code, setNumberCode] = useState("");
  const [form] = Form.useForm();
  const [file, setFile] = useState<any>(null); // State for the uploaded file

  const location = useLocation();
  const path = location.pathname;
  const ProjectID = parseInt(path.split("/")[2]);

  useEffect(() => {
    if (isModalVisible) {
      let document_name = reports.document_name?.split("-");
      console.log("document_name", document_name);
      setConsideredDocData(consideredDocuments(document_assignment.payload));
      setProjectCode(document_name[0]);
      setOriginator(document_name[1]);
      setFunctionalBreakdown(document_name[2]);
      setSpatial(document_name[3]);
      setForms(document_name[4]);
      setDiscipline(document_name[5]);
      setNumberCode(document_name[6]);
      form.setFieldsValue({
        ...reports,
        date: moment(reports.date, "YYYY-MM-DD"),
      });
    }
  }, [document_assignment, reports, isModalVisible, form]);


  const onSearchOriginator = (searchText: string) => {
    const arr = [{ value: searchText }, ...Originator];
    setOptionsOriginator(!searchText ? [] : arr);
  };

  const onSearchFunctionalBreakdown = (searchText: string) => {
    const arr = [{ value: searchText }, ...FunctionalBreakdown];
    setOptionsFunctionalBreakdown(!searchText ? [] : arr);
  };

  const onSearchSpatial = (searchText: string) => {
    const arr = [{ value: searchText }, ...Spatial];
    setOptionsSpatial(!searchText ? [] : arr);
  };

  const onSearchForms = (searchText: string) => {
    const arr = [{ value: searchText }, ...Forms];
    setOptionsForms(!searchText ? [] : arr);
  };

  const onSearchDiscipline = (searchText: string) => {
    const arr = [{ value: searchText }, ...Discipline];
    setOptionsDiscipline(!searchText ? [] : arr);
  };

  const onChangeHandlerDocumentName = (name: string, value: string) => {
    if (name === "originator") {
      setOriginator(value);
    } else if (name === "project_code") {
      setProjectCode(value);
    } else if (name === "functional_breakdown") {
      setFunctionalBreakdown(value);
    } else if (name === "spatial") {
      setSpatial(value);
    } else if (name === "forms") {
      setForms(value);
    } else if (name === "discipline") {
      setDiscipline(value);
    } else if (name === "number_code") {
      setNumberCode(value);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
  };

  const Submit = (value: any) => {
    // Prepare data object based on file existence
    let data;
    if (file) {
      let formData = new FormData();
      formData.append("id", reports.id.toString()); // Convert the id to a string
      formData.append("project_id", String(ProjectID));
      formData.append("type", type);
      formData.append(
        "document_name",
        `${project_code}-${originator}-${functional_breakdown}-${spatial}-${forms}-${discipline}-${zeroPad(
          number_code,
          2
        )}`
      );
      formData.append("date", value.date.format("YYYY-MM-DD"));
      formData.append("description", value.description);
      formData.append("ref_no", value.ref_no);
      formData.append("considered_doc_id", value.considered_doc_id);
      formData.append("author", value.author);
      formData.append("assigned_to", `${value.assigned_to}`);
      formData.append("file", value.file);
      data = formData;
    } else {
      data = {
        id: reports.id.toString(),
        project_id: String(ProjectID),
        type: type,
        document_name: `${project_code}-${originator}-${functional_breakdown}-${spatial}-${forms}-${discipline}-${zeroPad(
          number_code,
          2
        )}`,
        date: value.date.format("YYYY-MM-DD"),
        description: value.description,
        ref_no: value.ref_no,
        considered_doc_id: value.considered_doc_id,
        author: value.author,
        assigned_to: value.assigned_to,
      };
    }
    // Call the appropriate function based on file existence
    setLoading(true); // Set loading state while processing
    const actionFunction = file ? updateDataWithFile : updateDataWithOutFile;

    actionFunction(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllReports({
          project_id: project.payload.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed to edit", e.message)
        );
      });
  };

  // Function to handle file upload change
  const handleFileChange = (info: any) => {
    if (info.fileList.length > 1) {
      info.fileList = info.fileList.slice(-1);
    }
    setFile(info.fileList[0]?.originFileObj || null);
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        width={1200}
        centered
        title="Edit Report"
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
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            ...reports,
            date: moment(reports.date, "YYYY-MM-DD"),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker allowClear={false} />
              </Form.Item>
            </div>
            <div className="col-md-8">
              <Form.Item label="Document ID">
                <Row>
                  <Col span={4}>
                    <Input
                      placeholder="Project Code"
                      onChange={(e: any) =>
                        onChangeHandlerDocumentName("project_code", e)
                      }
                      value={project_code}
                      disabled
                    />
                  </Col>
                  {"-"}
                  <Col span={4}>
                    {" "}
                    <AutoComplete
                      options={optionsOriginator}
                      onSearch={onSearchOriginator}
                      placeholder="Originators"
                      onChange={(e: any) =>
                        onChangeHandlerDocumentName("originator", e)
                      }
                      filterOption={(inputValue: any, option: any) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      value={originator}
                    />
                  </Col>
                  {"-"}
                  <Col span={4}>
                    {" "}
                    <AutoComplete
                      options={optionsFunctionalBreakdown}
                      onSearch={onSearchFunctionalBreakdown}
                      placeholder="Functional Breakdown"
                      onChange={(e: any) =>
                        onChangeHandlerDocumentName("functional_breakdown", e)
                      }
                      filterOption={(inputValue: any, option: any) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      value={functional_breakdown}
                    />
                  </Col>
                  {"-"}
                  <Col span={4}>
                    {" "}
                    <AutoComplete
                      options={optionsSpatial}
                      onSearch={onSearchSpatial}
                      placeholder="Spatial"
                      onChange={(e: any) =>
                        onChangeHandlerDocumentName("spatial", e)
                      }
                      filterOption={(inputValue: any, option: any) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      value={spatial}
                    />
                  </Col>
                  {"-"}
                  <Col span={4}>
                    {" "}
                    <AutoComplete
                      options={optionsForms}
                      onSearch={onSearchForms}
                      placeholder="Form"
                      onChange={(e: any) => onChangeHandlerDocumentName("forms", e)}
                      filterOption={(inputValue: any, option: any) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      value={forms}

                    />
                  </Col>
                  {"-"}
                  <Col span={4}>
                    {" "}
                    <AutoComplete
                      options={optionsDiscipline}
                      onSearch={onSearchDiscipline}
                      placeholder="Discipline"
                      onChange={(e: any) =>
                        onChangeHandlerDocumentName("discipline", e)
                      }
                      filterOption={(inputValue: any, option: any) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      value={discipline}
                    />
                  </Col>
                  {"-"}
                  <Col span={4}>
                    <AutoComplete
                      options={optionsDiscipline}
                      onSearch={onSearchDiscipline}
                      placeholder="Number"
                      onChange={(e: string) => onChangeHandlerDocumentName("number", e)}
                      filterOption={(inputValue: any, option: any) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      value={number_code}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Description" name="description">
                <Input.TextArea autoSize rows={2} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Ref No" name="ref_no">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Considered Doc IDs"
                name="considered_doc_id"
                rules={[
                  { required: true, message: "Considered Doc IDs Required!" },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {consideredDocData.map((e, i) => (
                    <Select.Option key={i} value={e.id}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Author"
                name="author"
                rules={[{ required: true, message: "Author Required!" }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Assigned To"
                name="assigned_to"
                rules={[{ required: true, message: "Assigned to Required!" }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: false, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  defaultFileList={[
                    {
                      uid: "-1",
                      name: `${reports.document
                        ? reports.document?.name
                        : "No File"
                        }`,
                      status: "done",
                    },
                  ]}
                  name="file"
                  onChange={handleFileChange}
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button className="btn-outline-secondary">
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  document_assignment: state.document_assignment.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllReports: (action: any) => dispatch(fetchAllReports(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRTComponent);
