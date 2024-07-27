import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Document } from "../../../../../redux/Document/Document.type";
import { SharedDocument } from "../../../../../redux/SharedDocument/SharedDocument.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { authHeader } from "../../../../../utilities/utilities";

export type ShareDocumentPropType = {
  fetchAllDocuments: Function;
  fetchAllUser: Function;
  fetchAllSharedDocuments: Function;
  users: ApiCallState<User[]>;
  document: Document;
  sharedDocuments: ApiCallState<SharedDocument[]>;
};

export const sendData = (data: SharedDocument[]) =>
  axios.post(API_BASE_URI + "/shared_document", data, authHeader());

export const updateIsPrivate = (id: number, is_private: boolean) =>
  axios.put(API_BASE_URI + `/document/${id}`, { is_private }, authHeader());
