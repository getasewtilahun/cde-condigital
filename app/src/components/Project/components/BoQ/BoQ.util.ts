export type BoQPropType = {
  next: Function;
  setData: Function;
  data: BoQRegistrationStructure[];
  project_information: any;
  setProjectInformation: Function;
  type: "sub-contract" | "pre-contract" | "post-contract";
};

export type BoQRegistrationStructure = {
  is_super_title: boolean;
  is_title: boolean;
  is_sub_title: boolean | null;
  description: string;
  item_no: string;
  unit: string;
  quantity: number;
  unit_price: number;
  amount: number;
  key: number;
  reference_id: any;
  sheet_name: string;
  remark: string | null;
};

export type AddRemarkPropType = {
  setValue: Function;
  value: BoQRegistrationStructure;
};

export const Validation = (data: BoQRegistrationStructure[]) => {
  return true;
};
