import moment, { Moment } from "moment";
import axios from "axios";
import { API_BASE_URI } from "../../redux/ApiCall";
import { Log } from "../../redux/Log/Log.type";
import { User } from "../../redux/User/User.type";
import { ApiCallState } from "../../redux/Utils";
import { UserSeen } from "../../redux/UserSeen/UserSeen.type";

export type LogPropType = {
  log: ApiCallState<Log[]>;
  fetchLog: Function;
  setUserSeen: Function;
  user: ApiCallState<User>;
  user_seens: ApiCallState<UserSeen[]>;
};

export const updateSeen = (data: any) =>
  axios.put(API_BASE_URI + "/log/seen", data);

export const parseData = (log: Log[], last_seen: any, date_range: Moment[]) => {
  const parsed: any[] = [];
  let counter = 0;
  log.forEach((e) => {
    if (!moment(last_seen).isSameOrAfter(moment(e.date), "minute"))
      counter += 1;

    if (
      !date_range ||
      date_range.length === 0 ||
      (date_range[0].isSameOrBefore(e.date, "date") &&
        date_range[1].isSameOrAfter(e.date, "date"))
    )
      parsed.push({
        description: e.description,
        date: e.date,
        full_name: e.user?.full_name,
        status: moment(last_seen).isSameOrAfter(e.date, "minute"),
      });
  });

  return { parsed, counter };
};
