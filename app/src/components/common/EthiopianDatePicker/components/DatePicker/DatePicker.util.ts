import { PickerProps } from "antd/lib/date-picker/generatePicker";
import { Moment } from "moment";
import { PickerType } from "../../EthiopianDatePicker.util";
export type DatePickerValue = {
  month: number;
  day: number;
  year: number;
  date: string;
};

export type DatePickerPropsType = {
  values?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  picker: PickerType;
};
