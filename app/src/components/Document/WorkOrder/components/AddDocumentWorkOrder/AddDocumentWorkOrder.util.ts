import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Staff } from "../../../../../redux/Staff/Staff.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type AddDocumentWorkOrderPropType = {
  fetchStaff: Function;
  fetchDocumentWorkOrder: Function;
  staff: ApiCallState<Staff[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/document_work_order", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export type DocumentTableDatatype = {
  key: number;
  remark: string;
  document: any;
  name: string;
  type: string;
};
