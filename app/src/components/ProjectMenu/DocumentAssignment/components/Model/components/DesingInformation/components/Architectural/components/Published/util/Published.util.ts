import axios from "axios";
import { API_BASE_URI } from "../../../../../../../../../../../../redux/ApiCall";
import { DocumentAssignment } from "../../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.type";
import { Project } from "../../../../../../../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../../../../../../redux/Utils";

export type PublishedPropType = {
  fetchUsers: Function;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  fetchAllDocumentAssignment: Function;
  tab: any;
  category: string;
  folder: string;
  sub_folder: string;
  type: string;
};

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/document-assignment/${id}`);
