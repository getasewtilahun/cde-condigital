import { DatePicker, Input, InputNumber, Select } from "antd";
import Form from "antd/lib/form";
import { FC, useState } from "react";
import {
  BUILD,
  BuildType,
  ContractTypes,
  ProjectTypes,
  TypeOfProject,
} from "../../../../../constants/Constants";
import { GeneralPropType } from "./General.util";
import {
  formatterNumber,
  NumberValidator,
  parserNumber,
} from "../../../../../utilities/utilities";
let { Option } = Select;
const GeneralComponent: FC<GeneralPropType> = ({
  form,
  setData,
  data,
  next,
  type,
}) => {
  const [project_type, setProjectType] = useState(
    data?.type ? data?.type : ProjectTypes.BUILDING
  );

  const renderUnit = () => {
    switch (project_type) {
      case ProjectTypes.BUILDING:
        return (
          <>
            <div className="col-md-2 register_project">
              <Form.Item
                label="Basement"
                rules={[{ required: true, validator: NumberValidator }]}
                name="basement_size"
              >
                <Input type="number" min={0} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                label="Floor"
                rules={[{ required: true, validator: NumberValidator }]}
                name="floor_size"
              >
                <Input type="number" min={0} />
              </Form.Item>
            </div>
          </>
        );
      case ProjectTypes.RENOVATION:
        return <></>;
      case ProjectTypes.ROAD:
        return (
          <>
            <div className="col-md-4">
              <Form.Item
                label="Km"
                rules={[{ required: true, validator: NumberValidator }]}
                name="road_size"
              >
                <Input type="number" min={0} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Project Start"
                rules={[
                  { required: true, message: "Please input Project Start" },
                ]}
                name="project_start"
              >
                <Input type="text" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Project End"
                rules={[
                  { required: true, message: "Please input Project End" },
                ]}
                name="project_end"
              >
                <Input type="text" />
              </Form.Item>
            </div>
          </>
        );
      default:
        return (
          <div className="col-md-4">
            <Form.Item
              label="Size"
              rules={[{ required: true, message: "Please input Project Size" }]}
              name="custom_size"
            >
              <Input type="text" />
            </Form.Item>
          </div>
        );
    }
  };

  const onFinish = (values: any) => {
    console.log({
      ...data,
      ...values,
    });
    setData({
      ...data,
      ...values,
    });
    next();
  };

  const onFinishFailed = (errorInfo: any) => {
    // errorInfo.errorFields.some((e: any) => {
    //   OpenNotification(
    //     NotificationType.ERROR,
    //     Message.EMPTY_FIELD,
    //     e.errors[0]
    //   );
    //   return true;
    // });
  };
  return (
    <Form
      layout="vertical"
      initialValues={data}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className="row">
        <div className="col-md-4">
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: "Project Name Required!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            label="Project Type"
            rules={[{ required: true, message: "Please input Project Type!" }]}
            name="type"
          >
            <Select onChange={(e) => setProjectType(e ? e.toString() : "")}>
              <Option value={ProjectTypes.BUILDING}>
                {ProjectTypes.BUILDING}
              </Option>

              <Option value={ProjectTypes.ROAD}>{ProjectTypes.ROAD}</Option>
              <Option
                disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                value={ProjectTypes.RENOVATION}
              >
                {ProjectTypes.RENOVATION}
              </Option>
              <Option
                disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                value={ProjectTypes.INDUSTRY}
              >
                {ProjectTypes.INDUSTRY}
              </Option>
              <Option
                disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                value={ProjectTypes.WATER}
              >
                {ProjectTypes.WATER}
              </Option>
              <Option
                disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                value={ProjectTypes.POWER}
              >
                {ProjectTypes.POWER}
              </Option>
            </Select>
          </Form.Item>
        </div>
        {renderUnit()}
        {type === TypeOfProject.PRE_CONTRACT ? null : (
          <>
            <div className="col-md-4">
              <Form.Item
                label="Contract Type"
                name="contract_type"
                rules={[
                  { required: true, message: "Please input Contract Type!" },
                ]}
              >
                <Select placeholder="Type">
                  <Option value={ContractTypes.DESIGN_BUILD}>
                    {ContractTypes.DESIGN_BUILD}
                  </Option>
                  <Option value={ContractTypes.DESIGN_BID_BUILD}>
                    {ContractTypes.DESIGN_BID_BUILD}
                  </Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Date"
                rules={[
                  {
                    required: true,
                    message: "Please input Date!",
                  },
                ]}
                name="date"
              >
                <DatePicker.RangePicker />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Project Budget"
                rules={[{ required: true, validator: NumberValidator }]}
                name="budget"
              >
                <InputNumber
                  min={0}
                  formatter={formatterNumber}
                  parser={parserNumber}
                  style={{ width: "100%" }}
                  placeholder="Budget"
                />
              </Form.Item>
            </div>
          </>
        )}
      </div>
    </Form>
  );
};
export default GeneralComponent;
