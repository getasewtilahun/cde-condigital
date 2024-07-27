import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { UserAccess, UserRole } from "../../../../redux/UserRole/UserRole.type";
import { ApiCallState } from "../../../../redux/Utils";

export type UserRolePropType = {
  user_roles: ApiCallState<UserRole[]>;
  fetchUserRoles: Function;
};

export type AddUserRolePropType = {
  fetchUserRoles: Function;
  id?: number;
  fetchUserRole: Function;
  user_role: ApiCallState<UserRole>;
};

export type ViewUserRolePropType = {
  id: number;
  fetchUserRole: Function;
  user_role: ApiCallState<UserRole>;
};

export const POST = (data: any) =>
  axios.post(`${API_BASE_URI}/user-role`, data);

export const DELETE = (id: number) =>
  axios.delete(`${API_BASE_URI}/user-role/${id}`);

export const PUT = (data: any) => axios.put(`${API_BASE_URI}/user-role`, data);

export const getRoles = (user_accesses: UserAccess[]) => {
  let data: UserAccess[] = [];

  USER_ACCESSES.forEach((e) => {
    let found = user_accesses?.find(
      (user_access) => user_access.feature === e.name
    );
    if (found) {
      data.push({
        ...found,
        feature: e.name,
        key: data.length,
      });
    } else {
      data.push({
        feature: e.name,
        key: data.length,
        delete: false,
        edit: false,
        read: false,
        write: false,
        approve: false,
        check: false,
        approve_special: [],
        entry_special: [],
        url: "",
        group: ""
      });
    }
  });

  return data;
};

export const USER_ACCESSES = [
  { name: "Project", url: "/projects", group: "Project" },
  { name: "User Assignment", url: "/user-assign", group: "Project" },
  { name: "BIM Documents", url: "/documents", group: "Document" },
  { name: "Model Document", url: "/documents", group: "Document" },
  { name: "Shared Documents And Reference Information", url: "/documents", group: "Document" },
  { name: "Other Documents", url: "/documents", group: "Document" },
  { name: "Clash Detection Report", url: "/report", group: "Report" },
  { name: "Model Quality Check Report", url: "/report", group: "Report" },
  { name: "Progress Report", url: "/report", group: "Report" },
  { name: "Review for Approval", url: "/communication", group: "Communication" },
  { name: "Request for Information", url: "/communication", group: "Communication" },
  { name: "Schedule Meeting", url: "/communication", group: "Communication" },
  { name: "Project Informations", url: "/project-details", group: "ProjectDetail" },
  { name: "Project Informations", url: "/project-details", group: "ProjectDetail" },
  { name: "Organizations", url: "/project-details", group: "ProjectDetail" },
  { name: "Teams", url: "/project-details", group: "ProjectDetail" },
];
