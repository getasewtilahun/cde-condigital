import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Document } from "../../../../../redux/Document/Document.type";
import { authHeader } from "../../../../../utilities/utilities";

export type UpdateDocumentStatusPropType = {
  fetchAllDocuments: Function;
  document: Document;
};

export const updateIsPrivate = (id: number, is_private: boolean) =>
  axios.put(API_BASE_URI + `/document/${id}`, { is_private }, authHeader());
