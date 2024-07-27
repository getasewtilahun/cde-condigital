import { InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { RangerPickerPropsType } from "./RangePicker.util";
import { ETHIOPIAN_MONTHS } from "../../../../../constants/Constants";
import { getYear } from "../../EthiopianDatePicker.util";

const RangePickerComponent: React.FC<RangerPickerPropsType> = ({
  onChange,
  values,
  picker,
}) => {
  console.log(
    "🚀 ~ file: RangePicker.component.tsx ~ line 12 ~ values",
    values
  );

  const [start_day, setStartDay] = useState<any>(values?.start_day || 1);
  const [end_day, setEndDay] = useState<any>(values?.end_day || 1);
  const [start_month, setStartMonth] = useState<any>(values?.start_month || 1);
  const [end_month, setEndMonth] = useState<any>(values?.end_month || 2);
  const [start_year, setStartYear] = useState<any>(values?.start_year || 2013);
  const [end_year, setEndYear] = useState<any>(values?.end_year || 2013);
  const [start_date, setStartDate] = useState<any>(
    values?.start_date || "2013-01-01"
  );
  const [end_date, setEndDate] = useState<any>(
    values?.end_date || "2013-02-01"
  );

  const triggerChange = (changedValue: {
    start_day?: number;
    end_day?: number;
    start_month?: number;
    end_month?: number;
    start_year?: number;
    end_year?: number;
    start_date?: string;
    end_date?: string;
  }) => {
    onChange?.({
      start_day,
      end_day,
      start_month,
      end_month,
      start_year,
      end_year,
      start_date,
      end_date,
      ...values,
      ...changedValue,
    });
  };

  useEffect(() => {
    triggerChange({
      start_day,
      end_day,
      start_month,
      end_month,
      start_year,
      end_year,
      start_date,
      end_date,
    });
  }, [
    start_day,
    end_day,
    start_month,
    end_month,
    start_year,
    end_year,
    start_date,
    end_date,
  ]);

  const onStartDateChange = (e: any) => {
    const new_day = e || null;
    if (Number.isNaN(start_day)) {
      return;
    }
    setStartDay(new_day);
    setStartDate(`${start_year}-${start_month}-${new_day}`);
    triggerChange({
      start_day: new_day,
      start_date: `${start_year}-${start_month}-${new_day}`,
    });
  };

  const onEndDateChange = (e: any) => {
    const new_day = e || null;
    if (Number.isNaN(end_day)) {
      return;
    }

    setEndDay(new_day);
    setEndDate(`${end_year}-${end_month}-${new_day}`);
    triggerChange({
      end_day: new_day,
      end_date: `${end_year}-${end_month}-${new_day}`,
    });
  };

  const onStartMonthChange = (e: any) => {
    const new_month = e || null;
    if (Number.isNaN(start_month)) {
      return;
    }

    setStartMonth(new_month);
    setStartDate(`${start_year}-${new_month}-${start_day}`);
    triggerChange({
      start_month: new_month,
      start_date: `${start_year}-${new_month}-${start_day}`,
    });
  };

  const onEndMonthChange = (e: any) => {
    const new_month = e || null;
    if (Number.isNaN(end_month)) {
      return;
    }

    setEndMonth(new_month);
    setEndDate(`${end_year}-${new_month}-${end_day}`);
    triggerChange({
      end_month: new_month,
      end_date: `${end_year}-${new_month}-${end_day}`,
    });
  };

  const onStartYearChange = (e: any) => {
    const new_year = e || null;
    if (Number.isNaN(start_year)) {
      return;
    }
    setStartYear(new_year);
    setStartDate(`${new_year}-${start_month}-${start_day}`);
    triggerChange({
      start_year: new_year,
      start_date: `${new_year}-${start_month}-${start_day}`,
    });
  };

  const onEndYearChange = (e: any) => {
    const new_year = e || null;
    if (Number.isNaN(end_year)) {
      return;
    }
    setEndYear(new_year);
    setEndDate(`${new_year}-${end_month}-${end_day}`);

    triggerChange({
      end_year: new_year,
      end_date: `${new_year}-${end_month}-${end_day}`,
    });
  };

  useEffect(() => {
    setStartDay(values?.start_day);
    setEndDay(values?.end_day);
    setStartMonth(values?.start_month);
    setEndMonth(values?.end_month);
    setStartDate(values?.start_date);
    setEndDate(values?.end_date);
  }, [values]);

  const render = () => {
    switch (picker) {
      case "date":
        return (
          <>
            <InputNumber
              bordered={false}
              min={1}
              max={start_month === 13 ? 5 : 30}
              type="number"
              value={start_day}
              onChange={(e) => onStartDateChange(e)}
              style={{ width: 45 }}
              placeholder="day"
            />
            /
            <Select
              bordered={false}
              value={start_month}
              onChange={(e) => onStartMonthChange(e)}
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
              value={start_year}
              onChange={(e) => onStartYearChange(e)}
              style={{ width: 100 }}
              placeholder="year"
            >
              {getYear().map((e, index) => (
                <Select.Option key={index} value={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
            to
            <InputNumber
              bordered={false}
              min={1}
              max={end_month === 13 ? 5 : 30}
              type="number"
              value={end_day}
              onChange={(e) => onEndDateChange(e)}
              style={{ width: 45 }}
              placeholder="day"
            />
            /
            <Select
              bordered={false}
              value={end_month}
              onChange={(e) => onEndMonthChange(e)}
              style={{ width: 100 }}
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
              value={end_year}
              onChange={(e) => onEndYearChange(e)}
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
              value={start_month}
              onChange={(e) => onStartMonthChange(e)}
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
              value={start_year}
              onChange={(e) => onStartYearChange(e)}
              style={{ width: 100 }}
              placeholder="year"
            >
              {getYear().map((e, index) => (
                <Select.Option key={index} value={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
            to
            <Select
              bordered={false}
              value={end_month}
              onChange={(e) => onEndMonthChange(e)}
              style={{ width: 100 }}
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
              value={end_year}
              onChange={(e) => onEndYearChange(e)}
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
      case "year":
        return (
          <>
            <Select
              bordered={false}
              value={start_year}
              onChange={(e) => onStartYearChange(e)}
              style={{ width: 100 }}
              placeholder="year"
            >
              {getYear().map((e, index) => (
                <Select.Option key={index} value={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
            to
            <Select
              bordered={false}
              value={end_year}
              onChange={(e) => onEndYearChange(e)}
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
    }
  };

  return render();
};
export default RangePickerComponent;
