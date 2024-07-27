import { InputNumberProps, SelectProps, StatisticProps } from "antd";
import { RuleObject } from "antd/lib/form";
import axios, { AxiosError } from "axios";
import convert from "convert-units";
import ethiopic from "ethiopic-js";
import { groupBy, isArray, isNil, toNumber } from "lodash";
import moment, { Moment } from "moment";
import { matchPath } from "react-router";
import { USER_ACCESSES } from "../components/User/UserRole/utils/UserRole.util";
import { OpenNotification } from "../components/common/Notification/Notification.component";
import {
  MODULES,
  NotificationType,
  REBAR_LENGTH,
  Status,
  UNITS,
} from "../constants/Constants";
import { API_BASE_URI } from "../redux/ApiCall";
import { User } from "../redux/User/User.type";
import { UserAccess } from "../redux/UserRole/UserRole.type";
import { ApiCallState } from "../redux/Utils";

import xlsx, { WorkBook } from "xlsx";
import { getDateValue } from "../components/common/EthiopianDatePicker/EthiopianDatePicker.util";

export const EtRegEx = /^(^\+251|^251|^0)?9\d{8}$/;
export const NumRegEx = /^[0-9]+$/;
export const WordsRegEx = /^[a-zA-Z_ ]*$/;

export const readExcel = (file: any) => {
  return new Promise<xlsx.WorkBook>((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      var data = event.target.result;

      var workbook = xlsx.read(data, { type: "binary" });

      resolve(workbook);
    };
    reader.readAsBinaryString(file);
  });
};

export const DataFormat = (size: any): string => {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

export const onChangeHandler = (
  key: number,
  name: string,
  value: any,
  data: any[],
  setData: Function
) => {
  const newData = [...data];

  const index = newData.findIndex((e) => e.key === key);
  if (index !== -1) {
    let item = newData[index];
    item = {
      ...item,
      [name]: value,
    };
    newData.splice(index, 1, item);
    setData(newData);
  }
};

export const getYesterday = (): string => {
  const date = moment().date();
  const month = moment().month();
  const year = moment().year();
  const parsed = ethiopic.toEthiopic(year, month + 1, date - 1);
  return `${parsed[0]}-${parsed[1]}-${parsed[2]}`;
};

export const formatNumber = (x: string | number) => {
  if (isNil(x)) {
    return 0;
  } else {
    var val = Math.round(Number(x!) * 100) / 100;
    var parts = val.toString().split(".");
    var num =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "");
    return num;
  }
};

export const handleChange = (
  value: any,
  key: any,
  data: any,
  index: any,
  state: any,
  setState: Function
) => {
  let st = data;
  st[key] = value;
  state[index] = st;
  setState([...state]);
};

export const format = (data: any, type?: boolean): string => {
  if (!isNaN(data)) {
    if ((!isNil(data) && data !== "-") || (!isNil(data) && !isNil(type))) {
      return data === 0
        ? type
          ? "0"
          : "-"
        : eEnglish(toNumber(toNumber(data).toFixed(2)));
    } else if (data === "-") return "";
    else return "-";
  } else {
    return type ? "0" : "-";
  }
};

const eEnglish = (x: number) => {
  return x.toLocaleString("en-US");
};
export const zeroPad = (num: any, len: number = 4): string =>
  String(num).padStart(len, "0");

export const getUrl = (key: string) => {
  return key?.toLocaleLowerCase()?.split(" ").join("-");
};

export const authHeader = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

export const authMarketPlaceHeader = () => {
  return {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFtb24gSXNheWFzIEV5YXN1IiwiZW1haWwiOiJhbW9uaXNheWFzMTIzNEBnbWFpbC5jb20iLCJ0eXBlIjoiQnV5ZXIiLCJjb21wYW55X2lkIjoyLCJjb21wYW55Ijp7ImlkIjoyLCJuYW1lIjoiQ29uRGlnaXRhbCIsInRpbiI6IjIwNjU5IiwiY2l0eSI6IkFkZGlzIEFiZWJhIiwid29yZWRhIjoiMDQiLCJwaG9uZV9udW1iZXJfMSI6IisyNTE5MTM4OTc4OTkiLCJwaG9uZV9udW1iZXJfMiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0wMi0wNVQwOTo0Mzo0OS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0wNVQwOTo0Mzo0OS4wMDBaIn0sImlhdCI6MTcwODAwMDk3OX0.3V_18QM7INdSCqkUhQymW2bmeYOCifboh38es4JbuNc`,
    },
  };
};

export const NumberValidator = (rule: RuleObject, value: number) => {
  return new Promise((resolve, reject) => {
    if (!value) reject("Required!");
    else if (value < 0) reject("Positive Number Only!");
    else resolve(null);
  });
};

export const PhoneValidator = (rule: RuleObject, value: string) => {
  return new Promise((resolve, reject) => {
    var phone_number_regx = /^(^\+251|^251|^0)?9\d{8}$/;
    if (!value) reject("Phone Number Required!");
    else if (!value.match(phone_number_regx))
      reject("Incorrect Phone Number Format!");
    else resolve(null);
  });
};

export const EmailValidator = (rule: RuleObject, value: string) => {
  return new Promise((resolve, reject) => {
    var email_regx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (value && !email_regx.test(value)) reject("Incorrect Email Format!");
    resolve(null);
  });
};

export const ErrorHandler = (error: AxiosError) => {
  const errors: { message: string; type: number | undefined }[] = [];

  if (error.response) {
    if (isArray(error.response.data.errors))
      error.response.data.errors.forEach((e: any) => {
        errors.push({ message: e.message, type: error.response?.status });
      });
    else errors.push({ message: "Unknown Error", type: undefined });
  } else if (error.request) {
    errors.push({ message: "Connection Error", type: error.request?.status });
  } else {
    errors.push({ message: "Unknown Error", type: undefined });
  }

  return errors;
};

export const DownloadErrorHandler = (error: AxiosError) => {
  const errors: { message: string; type: number | undefined }[] = [];
  if (error.response) {
    errors.push({ message: "Nothing to Export", type: 400 });
  } else if (error.request) {
    errors.push({ message: "Connection Error", type: error.request?.status });
  }
  return errors;
};

export const Download = (id: any) =>
  axios.get(API_BASE_URI + `/document/download/${id}`, {
    responseType: "blob",
  });

export const formatterNumber = (value: any) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parserNumber = (value: any) => {
  return value ? value.replace(/\$\s?|(,*)/g, "") : "";
};

export const inputNumberProps: InputNumberProps = {
  parser: parserNumber,
  formatter: formatterNumber,
};

export const saveUserData = (data: any) => {
  localStorage.setItem(
    "data",
    JSON.stringify({
      email: data?.email,
      full_name: data?.name,
      id: data?.id,
      position: data?.position,
      user_role: data?.user_role,
      is_super_user: data?.is_super_user,
    })
  );

  localStorage.setItem("token", data?.token);
  localStorage.setItem("user_id", data?.id);
  localStorage.setItem("expiresIn", moment.now().toString());
};

export const getUserData = (): User => {
  const temp: any = localStorage.getItem("data");
  if (temp) {
    let _temp = JSON.parse(temp);
    // console.log("user", _temp);
    return _temp;
  } else
    return {
      full_name: "",
      id: 1,
      phone_number: "",
      chat_id: "",
      email: "",
      organization: "",
      access_type: "",
      role_id: "",
      roles: [],
      is_super_user: false,
      status: "Active",
      user_role: { name: "", user_accesses: [], id: 0 },
    };
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const expiresIn = localStorage.getItem("expiresIn");

  if (!token) {
    logout();
    return false;
  }

  if (expiresIn) {
    const expiresInDate = moment(parseInt(expiresIn, 10));

    const duration = moment.duration(moment().diff(expiresInDate));

    if (duration.asDays() >= 1) {
      logout();
      return false;
    }

    return true;
  }

  logout();
  return false;
};

export const checkRouteAuthorization = (path: string): boolean => {
  const user = getUserData();
  const userAccess: any = [
    {
      url: "/dashboard",
      feature: "Dashboard",
      name: "Dashboard",
    },
  ];

  getUserAccess(user)?.find((items) => {
    items.group.toLowerCase() == "project"
      ? (userAccess.push({
        ...items,
        url: "/project/detail/:id",
        feature: "Project Detail",
        name: "Project Detail",
      }),
        userAccess.push(items))
      : userAccess.push(items);
  });
  let user_access = userAccess.findIndex((e: any) => matchPath(e.url, path));

  return user.is_super_user || user_access !== -1;
  // return true;
};

export const checkModuleAuthorization = (
  module: string,
  isGroup: boolean,
  action?: string
): boolean => {
  const user_access = getUserAccess(getUserData());
  console.log("User Access:", user_access); // Log user access

  if (getUserData().is_super_user || module === MODULES.DASHBOARD) {
    return true;
  } else {
    if (isGroup)
      return (
        user_access?.findIndex(
          (e) => e?.group?.toLocaleLowerCase() === module?.toLocaleLowerCase()
        ) !== -1
      );
    else
      console.log("Elsssssssss");
    return (
      user_access?.findIndex((e) => {
        return (
          e.feature?.toLocaleLowerCase() === module?.toLocaleLowerCase() &&
          (!action || getAction(e, action))
        );
      }) !== -1
    );
  }
};

export const checkModuleStrictAuthorization = (
  module: string,
  action: string
): boolean => {
  const {
    user_role: { user_accesses },
  } = getUserData();

  return (
    user_accesses?.findIndex((e: any) => {
      return (
        e.feature?.toLocaleLowerCase() === module?.toLocaleLowerCase() &&
        getAction(e, action)
      );
    }) !== -1
  );
};

export const getAction = (user_access: any, action: any) => {
  return user_access[action];
};

export const getInitTab = (group: string) => {
  console.log({
    g: getUrl(
      getUserAccess(getUserData()).filter(
        (e) => e.group?.toLocaleLowerCase() === group?.toLocaleLowerCase()
      )[0]?.feature
    ),
    a: getUrl(
      USER_ACCESSES.find(
        (e) => e.group.toLocaleLowerCase() === group.toLocaleLowerCase()
      )?.name as string
    ),
  });
  if (getUserData().is_super_user)
    return getUrl(
      USER_ACCESSES.find(
        (e) => e.group.toLocaleLowerCase() === group.toLocaleLowerCase()
      )?.name as string
    );

  return getUrl(
    getUserAccess(getUserData()).filter(
      (e) => e.group?.toLocaleLowerCase() === group?.toLocaleLowerCase()
    )[0]?.feature
  );
};

interface UserAccessType extends UserAccess {
  url: string;
  group: string;
}

export const getUserAccess = (user: User) => {
  let parsed: UserAccessType[] = [];
  user.user_role?.user_accesses?.forEach((e: any) => {
    if (e.read || e.delete || e.write || e.edit) {
      let found = USER_ACCESSES.find(
        (user_access) => user_access.name === e.feature
      );
      if (found) parsed.push({ ...found, ...e });
    }
  });

  return parsed;
};

export const logout = (): void => {
  localStorage.setItem("data", "");
  localStorage.setItem("token", "");
  localStorage.setItem("expiresIn", "");
  localStorage.setItem("user_id", "");
};

export const initAxios = (token: any) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token ? token : localStorage.getItem("token")}`,
  };
};

export const checkStatus = (
  data: ApiCallState<any>
): { status: "validating" | "error" | "warning"; message: string } => {
  if (data.isPending) {
    return { status: "validating", message: "Loading" };
  } else if (data.error)
    return { status: "error", message: "Failed to Fetch Data" };
  else return { status: "warning", message: "Select Item" };
};

export const SelectorFeedBack = (
  selected_item: any,
  data: ApiCallState<any>
) => {
  if (selected_item) {
    return {
      hasFeedback: false,
    };
  } else {
    const { status, message } = checkStatus(data);
    return {
      hasFeedback: true,
      validateStatus: status,
      help: message,
    };
  }
};

export const getLastId = (data: any[]) => {
  if (data) {
    const length = data?.length;
    if (length === 0) return 1;
    else return data[length - 1].id + 1;
  } else return 1;
};

export const getLastNo = (data: any[]) => {
  if (data) {
    const length = data?.length;
    if (length === 0) return 1;
    else return data[length - 1].no + 1;
  } else return 1;
};
export const getLastItem = (data: any[], property: string) => {
  if (data) {
    const length = data?.length;
    if (length === 0) return 1;
    else return toNumber(data[length - 1][property]) + 1;
  } else return 1;
};

export const searchProp: SelectProps = {
  showSearch: true,
  optionFilterProp: "children",
  filterOption: (input: any, option: any) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  className: "w-100",
  style: { width: "100%" },
};

export const statisticProp: StatisticProps = {
  valueStyle: { fontSize: 16, fontFamily: "Campton-Medium" },
};

export const removeHandler = (key: number, data: any[], setData: Function) => {
  const newData = [...data];
  const index = newData.findIndex((e) => e.key === key);
  if (index !== -1 && data.length > 1) {
    newData.splice(index, 1);
    setData(newData);
  }
};

export const parseUnit = (unit: any) => {
  let parsed = unit;
  UNITS.forEach((e) => {
    if (e.value === unit) parsed = e.name;
  });
  return parsed;
};

export const getUnitType = (unit: string) => {
  let found_type = "mass";
  let found = UNITS.find((e) => e.value === unit);
  if (found) {
    return found.type;
  }
  return found_type;
};

export const getInitials = (full_name: string) => {
  if (full_name) {
    let split = full_name?.toUpperCase().split(" ");
    if (split.length === 1) {
      return `${split[0].charAt(0)}${split[0].charAt(1)}`;
    } else {
      return `${split[0].charAt(0)}${split[1].charAt(0)}`;
    }
  }
  return "";
};

export const handleDeletedChange = (
  data: any,
  index: any,
  state: any,
  setState: any
) => {
  let st = data;
  st.isEdited = true;
  st.isDeleted = true;
  state[index] = st;
  setState([...state]);
};

export const handleEditedChange = (
  value: any,
  key: string,
  data: any,
  index: any,
  state: any,
  setState: any
) => {
  let st = data;
  st[key] = value;
  st.isEdited = true;
  state[index] = st;
  setState([...state]);
};

export const getFileName = (url: string) => {
  let splitted = url.split("-");
  if (splitted[1]) {
    delete splitted[0];

    return splitted.join("-").slice(1, splitted.join("-").length);
  } else {
    return splitted[0];
  }
};

export const leftOuterJoin = (
  obj1: any[],
  obj2: any[],
  attribute: string = "id"
): any => {
  let map: any = {};
  for (var i = 0; i < obj1.length; i++) {
    map[obj1[i][attribute]] = 1;
  }
  var result = [];
  for (i = 0; i < obj2.length; i++) {
    if (!(obj2[i].id in map)) {
      result.push(obj2[i]);
    }
  }
  return result;
};

// export const inWords = (num: any) => {};

const arr = (x: any) => Array.from(x);
const num = (x: any) => Number(x) || 0;
const isEmpty = (xs: any) => xs.length === 0;
const take = (n: any) => (xs: any) => xs.slice(0, n);
const drop = (n: any) => (xs: any) => xs.slice(n);
const reverse = (xs: any) => xs.slice(0).reverse();
const comp = (f: any) => (g: any) => (x: any) => f(g(x));
const not = (x: any) => !x;
const chunk =
  (n: any) =>
    (xs: any): any =>
      isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

const inWords = (n: any): String => {
  let a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  let b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  let g = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
  ];

  let makeGroup = ([ones, tens, huns]: any) => {
    return [
      num(huns) === 0 ? "" : a[huns] + " hundred ",
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "",
      a[tens + ones] || a[ones],
    ].join("");
  };

  let thousand = (group: any, i: any) =>
    group === "" ? group : `${group} ${g[i]}`;

  if (typeof n === "number") return inWords(String(n));
  else if (n === "0") return "zero";
  else
    return comp(chunk(3))(reverse)(arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(" ");
};
const inWordsamh = (n: any): String => {
  let a = [
    "",
    "አንድ",
    "ሁለት",
    "ሶስት",
    "አራት",
    "አምስት",
    "ስድስት",
    "ሰባት",
    "ስምንት",
    "ዘጠኝ",
    "አስር",
    "አስራ አንድ",
    "አስራ ሁለት",
    "አስራ ሶስት",
    "አስራ አራት",
    "አስራ አምስት",
    "አስራ ስድስት",
    "አስራ ሰባት",
    "አስራ ስምንት",
    "አስራ ዘጠኝ",
  ];

  let b = ["", "", "ሃያ", "ሰላሳ", "አርባ", "ሃምሳ", "ስልሳ", "ሰባ", "ሰማንያ", "ዘጠና"];

  let g = [
    "",
    "ሺህ",
    "ሚልየን",
    "ቢልየን",
    "ትሪልየን",
    "ኳድሪልየን",
    "ኩንቲልየን",
    "ሴክስቲልዮን",
    "ሴፕቲልዮን",
    "ኦክቴልየን",
    "ኖኒልየን",
  ];

  let makeGroup = ([ones, tens, huns]: any) => {
    return [
      num(huns) === 0 ? "" : a[huns] + " መቶ" + " ",
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "",
      a[tens + ones] || a[ones],
    ].join("");
  };

  let thousand = (group: any, i: any) =>
    group === "" ? group : `${group} ${g[i]}`;

  if (typeof n === "number") return inWordsamh(String(n));
  else if (n === "0") return "ዜሮ";
  else
    return comp(chunk(3))(reverse)(arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(" ");
};

export const NumberToWord = (value: number) => {
  let split = value?.toString()?.split(".");
  if (split.length > 1) {
    return `${inWords(toNumber(split[0]))} and ${inWords(
      toNumber(split[1])
    )} cent`;
  } else {
    return inWords(value);
  }
};
export const NumberToWordamh = (value: number) => {
  let split = value?.toString()?.split(".");
  if (split.length > 1) {
    return `${inWordsamh(toNumber(split[0]))} እና ${inWordsamh(
      toNumber(split[1])
    )} ሳንቲም`;
  } else {
    return inWordsamh(value);
  }
};

export const toGC = (ethiopian_date: string): Moment => {
  const date = getDateValue(ethiopian_date);
  const parsed = ethiopic.toGregorian(date?.year, date?.month, date?.day);
  //
  return moment(`${parsed[0]}-${parsed[1]}-${parsed[2]}`, "YYYY-MM-DD");
};

export const getToday = (): string => {
  const date = moment().date();
  const month = moment().month();
  const year = moment().year();
  const parsed = ethiopic.toEthiopic(year, month + 1, date);
  return `${parsed[0]}-${parsed[1]}-${parsed[2]}`;
};

export const getTodayData = (): {
  month: number;
  day: number;
  year: number;
  date: string;
} => {
  const d = moment().date();
  const m = moment().month();
  const y = moment().year();
  const parsed = ethiopic.toEthiopic(y, m + 1, d);

  return {
    date: `${parsed[0]}-${parsed[1]}-${parsed[2]}`,
    month: parsed[1],
    day: parsed[2],
    year: parsed[0],
  };
};

export const isValidEthiopian = (date: string): boolean => {
  const { month, year, day } = getDateValue(date);
  return ethiopic.isValidEthiopicDate(year, month, day);
};

export const generateRandom4DigitNumber = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
