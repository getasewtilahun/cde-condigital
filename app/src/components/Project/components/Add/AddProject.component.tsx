import {
  Button, DatePicker, Form, Input, InputNumber, Modal, Select,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from 'moment';
import { fetchAllProject } from "../../../../redux/Project/Project.action";
import { AddProjectPropType, POST } from "../../utils/Project.util";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../constants/Constants";
import {
  ErrorHandler,
  inputNumberProps,
  searchProp,
} from "../../../../utilities/utilities";

type ProjectType = "Building" | "Road" | "Renovation" | "Industry" | "Water" | "Power";

const AddProjectComponent: FC<AddProjectPropType> = ({
  fetchProjects,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [projectType, setProjectType] = useState<ProjectType | ''>('');

  const projectTypeToAssetsMap: Record<ProjectType, string[]> = {
    Building: ["Hospital", "Hotel", "Class Rooms", "Laboratory", "Dormitory", "Commercial", "Mixed Use", "Apartments", "Other"],
    Road: ["Highway", "Street", "Bridge", "Tunnel"],
    Renovation: ["House", "Office", "Factory"],
    Industry: ["Factory", "Warehouse"],
    Water: ["Dam", "Pipeline"],
    Power: ["Substation", "Transmission Line"],
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (project && isModalVisible) {
      form.setFieldsValue({
        ...project,
        date: project.start_date && project.end_date ? [moment(project.start_date), moment(project.end_date)] : [],
      });
      setProjectType(project.project_type as ProjectType);
    }
  }, [project, isModalVisible, form]);

  const handleProjectTypeChange = (value: ProjectType) => {
    setProjectType(value);
    form.setFieldsValue({ type_of_asset: null }); // Reset type_of_asset when project_type changes
  };

  const Submit = (value: any) => {
    setLoading(true);

    const { date, ...rest } = value;
    const data = {
      ...rest,
      start_date: date ? date[0].format('YYYY-MM-DD') : null,
      end_date: date ? date[1].format('YYYY-MM-DD') : null,
      id: project?.id,
    };

    POST(data)
      .then(() => {
        fetchProjects();
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Project Registered", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register Project",
            e.message
          )
        );
      });
  };

  return (
    <>
      {project ? (
        <Button
          icon={<EditOutlined />}
          type="link"
          onClick={() => setIsModalVisible(true)}
        >
          Edit
        </Button>
      ) : (
        <Button
          className="btn-outline-secondary"
          style={{ float: "right" }}
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Register
        </Button>
      )}
      <Modal
        className="fixed-modal"
        width={1200}
        centered
        title="Project"
        open={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
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
          onValuesChange={(changedValues: { project_type: any; type_of_asset: string; }) => {
            if (changedValues.project_type) {
              handleProjectTypeChange(changedValues.project_type);
            }
          }}
          initialValues={{
            contract_type: "Design & Build",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="name" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                <Input placeholder="code" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                <Input placeholder="address" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="site_area" label="Site Area" rules={[{ required: true }]}>
                <Input placeholder="site_area" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="project_type"
                label="Project Type"
                rules={[{ required: true, message: 'Please select a project type' }]}
              >
                <Select
                  {...searchProp}
                  placeholder="Select a type"
                  allowClear
                >
                  <Select.Option value="Building">Building</Select.Option>
                  <Select.Option value="Road">Road</Select.Option>
                  <Select.Option value="Renovation">Renovation</Select.Option>
                  <Select.Option value="Industry">Industry</Select.Option>
                  <Select.Option value="Water">Water</Select.Option>
                  <Select.Option value="Power">Power</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {projectType && (
              <div className="col-md-6">
                <Form.Item
                  name="type_of_asset"
                  label="Type Of Asset"
                  rules={[{ required: true }]}
                >
                  <Select {...searchProp} placeholder="type">
                    {projectTypeToAssetsMap[projectType]?.map((asset) => (
                      <Select.Option key={asset} value={asset}>
                        {asset}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            )}
            {['Building', 'Industry', 'Renovation'].includes(projectType) && (
              <>
                <div className="col-md-6">
                  <Form.Item name="basement_size" label="Basement Size">
                    <InputNumber {...inputNumberProps} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="floor_size" label="Floor Size">
                    <InputNumber {...inputNumberProps} />
                  </Form.Item>
                </div>
              </>
            )}
            {['Road'].includes(projectType) && (
              <div className="col-md-6">
                <Form.Item name="road_size" label="Road Size">
                  <InputNumber {...inputNumberProps} />
                </Form.Item>
              </div>
            )}
            <div className="col-md-6">
              <Form.Item name="project_budget" label="Estimated Cost">
                <InputNumber {...inputNumberProps} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="estimated_duration" label="Estimated Duration">
                <InputNumber {...inputNumberProps} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="contract_type" label="Contract Type">
                <Select {...searchProp}>
                  <Select.Option value="Sub-Contract">Sub-Contract</Select.Option>
                  <Select.Option value="Post-Contract">Post-Contract</Select.Option>
                  <Select.Option value="Pre-Contract">Pre-Contract</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="date" label="Date">
                <DatePicker.RangePicker format="YYYY-MM-DD" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: () => dispatch(fetchAllProject()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectComponent);
