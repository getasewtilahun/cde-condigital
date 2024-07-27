import { isArray, toNumber } from "lodash";
import moment from "moment";
import { getToday } from "../../../utilities/utilities";
import { DatePickerValue } from "./components/DatePicker/DatePicker.util";
import { RangePickerValue } from "./components/RangePicker/RangePicker.util";

export type EthiopiaDatePickerPropType = {
  picker: PickerType;
  type: type;
  name?: string;
  label: string;
  value?: string | string[];
  onChange?: (value: string[]) => void;
  defaultValue?: boolean;
  required?: boolean;
};
export type PickerType = "month" | "date" | "year";
export type type = "Range" | "Single";

export const getRangeValue = (value?: any): RangePickerValue | undefined => {
  if (value && isArray(value) && value.length === 2) {
    const start_date = value[0].split("-");
    const end_date = value[1].split("-");
    const end_day = toNumber(end_date[2]);
    const end_month = toNumber(end_date[1]);
    const end_year = toNumber(end_date[0]);
    const start_day = toNumber(start_date[2]);
    const start_month = toNumber(start_date[1]);
    const start_year = toNumber(start_date[0]);

    return {
      end_date: value[1],
      start_date: value[0],
      end_day,
      end_month,
      end_year,
      start_day,
      start_month,
      start_year,
    };
  }
};

export const getDateValue = (value?: any): DatePickerValue => {
  if (value) {
    const split = value.split("-");
    let year = toNumber(split[0]);
    let month = toNumber(split[1]);
    let day = toNumber(split[2]);

    return { date: value, day, month, year };
  } else return { date: "2013-01-01", day: 1, month: 1, year: 2013 };
};

export const getYear = () => {
  const item = [];
  const { year } = getDateValue(getToday());
  for (let i = 2005; i <= year + 5; i++) item.push(i);
  return item;
};

export const msToTime = (duration: number) => {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${hours.toString().length === 2 ? hours : `0${hours}`} : ${
    minutes.toString().length === 2 ? minutes : `0${minutes}`
  }`;
};

export const from24HourToEthiopianTime = (time: string) => {
  let timeArr: string[] = time.split(":");
  let etHour;
  let secDesc;
  let timDesc;
  const hour = parseInt(timeArr[0]);
  if ((hour >= 0 && hour <= 5) || (hour >= 18 && hour <= 23)) {
    secDesc = "ምሽት";
    if (hour >= 0 && hour <= 5) {
      etHour = hour + 6;
    } else {
      if (hour === 18) etHour = 12;
      else etHour = hour - 18;
    }
  } else {
    secDesc = "ቀን";
    hour === 6 ? (etHour = 6) : (etHour = hour - 6);
    (etHour >= 1 && etHour <= 6) || etHour === 12
      ? (timDesc = "ጠዋት")
      : (timDesc = "ከሰዓት");
  }
  timeArr[0] = etHour.toString();
  // format 1:00,ጠዋት || 6:32,ምሽት
  return timDesc
    ? `${timeArr[0].length === 2 ? timeArr[0] : `0${timeArr[0]}`}:${
        timeArr[1]
      },${timDesc}`
    : `${timeArr[0].length === 2 ? timeArr[0] : `0${timeArr[0]}`}:${
        timeArr[1]
      },${secDesc}`;
};

export const fromEthiopianTimeTo24Hour = (time: any) => {
  const ethiopiantime = time.split(",")[0];
  const differentiator = time.split(",")[1];
  const etHour = parseInt(ethiopiantime.split(":")[0]);
  let gregorianHour;
  if (differentiator === "ምሽት") {
    etHour >= 1 && etHour <= 6
      ? (gregorianHour = etHour + 18)
      : (gregorianHour = etHour + 6);
  } else if (differentiator === "ቀን")
    etHour === 12 ? (gregorianHour = 6) : (gregorianHour = etHour + 6);
  else gregorianHour = etHour + 6;
  return `${
    gregorianHour.toString().length === 2 ? gregorianHour : `0${gregorianHour}`
  }:${ethiopiantime.split(":")[1]}`;
};

export const differenceBetween24HourDates = (time1: string, time2: string) => {
  var date1 = moment(`2007-01-01 ${time1}`);
  var date2 = moment(`2007-01-01 ${time2}`);
  var duration = date2.diff(date1);
  return msToTime(duration);
};

// export const msToTime = (duration: number) => {
//   let minutes = Math.floor((duration / (1000 * 60)) % 60);
//   let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

//   return `${hours.toString().length === 2 ? hours : `0${hours}`} : ${
//     minutes.toString().length === 2 ? minutes : `0${minutes}`
//   }`;
// };
