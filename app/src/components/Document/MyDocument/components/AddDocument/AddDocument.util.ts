import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type AddDocumentPropType = {
  project: ApiCallState<Project[]>;
  fetchProjects: Function;
  fetchDocument: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
