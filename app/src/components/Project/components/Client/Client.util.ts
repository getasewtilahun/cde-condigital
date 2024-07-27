import { FormInstance } from "antd";
import { Client } from "../../../../../redux/Client/Client.type";
import { Consultant } from "../../../../../redux/Consultant/Consultant.type";
import { Contractor } from "../../../../../redux/Contractor/Contractor.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type ClientPropType = {
  form: FormInstance;
  next: Function;
  setData: Function;
  data: any;
  client: ApiCallState<Client[]>;
  fetchClient: Function;
  contractor: ApiCallState<Contractor[]>;
  fetchContractor: Function;
  consultant: ApiCallState<Consultant[]>;
  fetchConsultant: Function;
};
