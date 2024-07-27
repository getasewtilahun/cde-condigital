import { BoQRegistrationStructure } from "../../BoQ.util";

export type BoQRowPropType = {
  row: BoQRegistrationStructure;
  data: BoQRegistrationStructure[];
  index: number;
  type: "sub-contract" | "pre-contract" | "post-contract";
  setValue: Function;
  setData: Function;
  project_type: string;
};

export const init_row = (
  key: number,
  sheet_name: string
): BoQRegistrationStructure => ({
  description: "",
  amount: 0,
  is_super_title: false,
  is_title: false,
  item_no: "",
  key: key,
  quantity: 0,
  unit: "",
  unit_price: 0,
  is_sub_title: null,
  sheet_name: sheet_name,
  reference_id: null,
  remark: null,
});

export const AddRow = (
  data: BoQRegistrationStructure[],
  index: number,
  sheet_name: string
) => {
  const new_data = [...data];
  new_data.splice(index + 1, 0, init_row(Date.now(), sheet_name));

  return new_data;
};
export const RemoveRow = (data: BoQRegistrationStructure[], index: number) => {
  const new_data = [...data];
  if (!new_data[index - 1].is_super_title) new_data.splice(index, 1);

  return new_data;
};
