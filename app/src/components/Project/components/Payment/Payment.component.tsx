import {  InputNumber } from "antd";
import Form from "antd/lib/form";
import { FC } from "react";
import { PaymentPropType } from "./Payment.util";
import { toNumber } from "lodash";
const PaymentComponent: FC<PaymentPropType> = ({
  data,
  form,
  next,
  setData,
}) => {
  const onFinish = (values: any) => {
    setData({ ...data, ...values });
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
            rules={[
              {
                required: true,
                message: "Please Input Valid Advance Payment!",
                type: "number",
                min: 0,
              },
            ]}
            label="Advance Payment"
            name={["project_payment", "advance_payment"]}
          >
            <InputNumber
              placeholder="0"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            label="Advance Repayment (in %)"
            rules={[
              {
                required: true,
                message: "Please Input Valid  Advance RePayment!",
                min: 0,
                max: 100,
                type: "number",
              },
            ]}
            name={["project_payment", "advance_percent"]}
          >
            <InputNumber
              placeholder="0"
              style={{ width: "100%" }}
              formatter={(value) => `${value}%`}
              parser={(value) => toNumber(value ? value.replace("%", "") : "")}
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            label="Rebate (In %)"
            rules={[
              {
                required: true,
                message: "Please input Valid Rebate!",
                type: "number",
                min: 0,
                max: 100,
              },
            ]}
            name={["project_payment", "rebate"]}
          >
            <InputNumber
              placeholder="0"
              style={{ width: "100%" }}
              formatter={(value) => `${value}%`}
              parser={(value) => toNumber(value ? value.replace("%", "") : "")}
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            label="Retention (In %)"
            rules={[
              {
                required: true,
                message: "Please input Valid Retention!",
                type: "number",
                min: 0,
                max: 100,
              },
            ]}
            name={["project_payment", "retention"]}
          >
            <InputNumber
              placeholder="0"
              style={{ width: "100%" }}
              formatter={(value) => `${value}%`}
              parser={(value) => toNumber(value ? value.replace("%", "") : "")}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
export default PaymentComponent;
