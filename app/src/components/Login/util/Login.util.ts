import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { User } from "../../../redux/User/User.type";
import { getUserAccess } from "../../../utilities/utilities";
import { USER_ACCESSES } from "../../User/UserRole/utils/UserRole.util";

export const login = (data: any) => {
  return axios.post(API_BASE_URI + "/user/login", data);
};

export const sendConfirmation = (email: string) => {
  return axios.post(API_BASE_URI + `/user/send-confirmation/${email}`);
};

export const getRoute = (user: User) => {
  if (user.status === "Activated")
    return USER_ACCESSES[0].url;
  else {
    console.log("user info", user);
    console.log(getUserAccess(user)[0]?.url);
    return getUserAccess(user)[0].url;
  }

};
