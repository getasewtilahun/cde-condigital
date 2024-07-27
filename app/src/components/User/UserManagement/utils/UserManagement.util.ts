import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { User } from "../../../../redux/User/User.type";
import { UserRole } from "../../../../redux/UserRole/UserRole.type";
import { ApiCallState } from "../../../../redux/Utils";
import { Organization } from "../../../../redux/Organization/Organization.type";

export type UserManagementPropType = {
  users: ApiCallState<User[]>;
  fetchUsers: Function;
  fetchUserRoles: Function;
};

export type EditUserManagementPropType = {
  data: User;
  fetchUsers: Function;
  user_roles: ApiCallState<UserRole[]>;
  fetchOrganizations: Function;
  organizations: ApiCallState<Organization>;
};

export type AddUserManagementPropType = {
  fetchUsers: Function;
  user_roles: ApiCallState<UserRole[]>;
  fetchOrganizations: Function;
  organizations: ApiCallState<Organization>;
};

export const POST = (data: any) => axios.post(`${API_BASE_URI}/user`, data);

export const DELETE = (id: number) =>
  axios.delete(`${API_BASE_URI}/user/${id}`);

export const PUT = (data: any) => axios.put(`${API_BASE_URI}/user`, data);

export const RESET = (data: any) => axios.put(`${API_BASE_URI}/user/reset`, data);

