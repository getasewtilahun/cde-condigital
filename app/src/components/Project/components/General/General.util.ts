import { FormInstance } from "antd";

export type GeneralPropType = {
  form: FormInstance;
  next: Function;
  setData: Function;
  data: any;
  type: "sub-contract" | "pre-contract" | "post-contract";
};
