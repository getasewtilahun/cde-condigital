import { PickerType } from "../../EthiopianDatePicker.util";

export type RangePickerValue = {
  start_month: number;
  start_day: number;
  start_year: number;
  end_month: number;
  end_day: number;
  end_year: number;
  start_date: string;
  end_date: string;
};

export type RangerPickerPropsType = {
  values?: RangePickerValue;
  onChange?: (value: RangePickerValue) => void;
  picker: PickerType;
};
