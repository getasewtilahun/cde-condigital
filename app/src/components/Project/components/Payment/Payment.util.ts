import { FormInstance } from "antd";

export type PaymentPropType = {
  form: FormInstance;
  next: Function;
  setData: Function;
  data: any;
};
