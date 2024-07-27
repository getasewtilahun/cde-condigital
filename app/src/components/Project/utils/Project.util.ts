import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { ApiCallState } from "../../../redux/Utils";
import { UserAssignment } from "../../../redux/UserAssignment/UserAssignment.type";

export type ProjectPropType = {
  projects: ApiCallState<Project[]>;
  userAssignments: ApiCallState<UserAssignment[]>;
  fetchProjects: Function;
  fetchUserAssignments: Function;
};

export type AddProjectPropType = {
  fetchProjects: Function;
  project?: Project;
};

export const POST = (data: any) => axios.post(`${API_BASE_URI}/project`, data);

export const DELETE = (id: number) =>
  axios.delete(`${API_BASE_URI}/project/${id}`);

export const PUT = (data: any) => axios.put(`${API_BASE_URI}/project`, data);
