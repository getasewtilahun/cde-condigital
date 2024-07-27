import axios from "axios";
import { API_BASE_URI } from "../../redux/ApiCall";
import { Project } from "../../redux/Project/Project.type";

export const sendData = (data: Project) =>
  axios.post(API_BASE_URI + "/project", data);

export type ProjectRegistrationPropType = {
  project_type: "sub-contract" | "pre-contract" | "post-contract";
};

export const sendFile = (data: any) => axios.post(API_BASE_URI + '/project/attached', data, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})