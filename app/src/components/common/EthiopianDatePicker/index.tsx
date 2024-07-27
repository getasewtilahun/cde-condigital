import { Form } from "antd";
import { RuleObject } from "antd/lib/form";
import { FC } from "react";
import DatePicker from "./components/DatePicker/DatePicker.component";
import RangerPicker from "./components/RangePicker/RangePicker.component";
import { DatePickerValue } from "./components/DatePicker/DatePicker.util";
import {
  EthiopiaDatePickerPropType,
  getDateValue,
  getRangeValue,
} from "./EthiopianDatePicker.util";
import { RangePickerValue } from "./components/RangePicker/RangePicker.util";
import {
  getTodayData,
  isValidEthiopian,
  toGC,
} from "../../../utilities/utilities";
import { isNil } from "lodash";
const EthiopiaDatePicker: FC<EthiopiaDatePickerPropType> = ({
  type,
  picker,
  label,
  name,
  value,
  onChange,
  defaultValue = true,
  required = true,
}) => {
  const date_value: DatePickerValue = getTodayData();

  const DatePickerValidator = (rule: RuleObject, value: DatePickerValue) => {
    return new Promise((resolve, reject) => {
      if (!value) reject("Invalid Date");
      else if (value.month === 13 && value.day > 6) reject("Invalid Date");
      else if (!toGC(value.date).isValid() && isValidEthiopian(value.date))
        reject("Invalid Date");
      else resolve(null);
    });
  };

  const RangerPickerValidator = (rule: RuleObject, value: RangePickerValue) => {
    return new Promise((resolve, reject) => {
      if (
        (value.start_month === 13 && value.start_day > 7) ||
        (value.end_month === 13 && value.end_day > 7)
      )
        reject("Invalid Date");
      else if (
        !toGC(value.start_date).isValid() ||
        !toGC(value.end_date).isValid()
      )
        reject("Invalid Date");
      else if (toGC(value.start_date) > toGC(value.end_date))
        reject("Invalid Date");
      else resolve(null);
    });
  };

  return (
    <Form.Item
      className="Ethiopia-Date"
      name={name}
      label={label}
      rules={[
        {
          validator:
            type === "Range" ? RangerPickerValidator : DatePickerValidator,
          required,
        },
      ]}
    >
      {type === "Range" ? (
        <RangerPicker
          values={getRangeValue(value)}
          picker={picker}
          onChange={(e) => {
            onChange?.([e.start_date, e.end_date]);
          }}
        />
      ) : (
        <DatePicker
          values={
            defaultValue
              ? !isNil(value)
                ? getDateValue(value)
                : date_value
              : undefined
          }
          picker={picker}
          onChange={(e) => onChange?.([e.date])}
        />
      )}
    </Form.Item>
  );
};
export default EthiopiaDatePicker;
