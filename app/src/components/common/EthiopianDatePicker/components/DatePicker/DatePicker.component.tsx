import { InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { DatePickerPropsType } from "./DatePicker.util";
import { ETHIOPIAN_MONTHS } from "../../../../../constants/Constants";
import { getDateValue, getYear } from "../../EthiopianDatePicker.util";
import { getToday } from "../../../../../utilities/utilities";
const DatePickerComponent: React.FC<DatePickerPropsType> = ({
  onChange,
  values,
  picker,
}) => {
  const [day, setDay] = useState<any>(values?.day);
  const [month, setMonth] = useState<any>(values?.month);
  const [year, setYear] = useState<any>(values?.year);
  const [date, setDate] = useState<any>(values?.date);

  const triggerChange = (changedValue: {
    day?: number;
    month?: number;
    year?: number;
    date?: string;
  }) => {
    onChange?.({
      day,
      month,
      year,
      date,
      ...values,
      ...changedValue,
    });
  };

  useEffect(() => {
    triggerChange({
      day,
      month,
      year,
      date,
    });
  }, []);

  const onDateChange = (e: any) => {
    const new_day = e || 1;
    if (Number.isNaN(day)) {
      return;
    }

    setDay(new_day);
    setDate(`${year}-${month}-${new_day}`);
    triggerChange({ day: new_day, date: `${year}-${month}-${new_day}` });
  };

  const onMonthChange = (e: any) => {
    const new_month = e || 1;
    if (Number.isNaN(month)) {
      return;
    }

    setMonth(new_month);
    setDate(`${year}-${new_month}-${day}`);
    triggerChange({ month: new_month, date: `${year}-${new_month}-${day}` });
  };

  const onYearChange = (e: any) => {
    const new_year = e || 1980;
    if (Number.isNaN(year)) {
      return;
    }
    setYear(new_year);
    setDate(`${new_year}-${month}-${day}`);
    setYear(new_year);
    triggerChange({ year: new_year, date: `${new_year}-${month}-${day}` });
  };

  const render = () => {
    switch (picker) {
      case "date":
        return (
          <>
            <InputNumber
              bordered={false}
              min={1}
              max={month === 13 ? 5 : 30}
              type="number"
              value={day}
              onChange={(e) => onDateChange(e)}
              style={{ width: 50 }}
              placeholder="day"
            />
            /
            <Select
              bordered={false}
              value={month}
              onChange={(e) => onMonthChange(e)}
              style={{ width: 100 }}
              placeholder="month"
            >
              {ETHIOPIAN_MONTHS.map((e, index) => (
                <Select.Option key={index} value={index + 1}>
                  {e}
                </Select.Option>
              ))}
            </Select>
            /
            <Select
              bordered={false}
              value={year}
              onChange={(e) => onYearChange(e)}
              style={{ width: 100 }}
              placeholder="year"
            >
              {getYear().map((e, index) => (
                <Select.Option key={index} value={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
          </>
        );

      case "month":
        return (
          <>
            <Select
              bordered={false}
              value={month}
              onChange={(e) => onMonthChange(e)}
              style={{ width: 100 }}
              placeholder="month"
            >
              {ETHIOPIAN_MONTHS.map((e, index) => (
                <Select.Option key={index} value={index + 1}>
                  {e}
                </Select.Option>
              ))}
            </Select>
            /
            <InputNumber
              bordered={false}
              type="number"
              min={1980}
              value={year}
              onChange={(e) => onYearChange(e)}
              style={{ width: 100 }}
              placeholder="year"
            />
          </>
        );
      case "year":
        return (
          <InputNumber
            bordered={false}
            type="number"
            min={1980}
            value={year}
            onChange={(e) => onYearChange(e)}
            style={{ width: 100 }}
            placeholder="year"
          />
        );
    }
  };

  return render();
};
export default DatePickerComponent;
