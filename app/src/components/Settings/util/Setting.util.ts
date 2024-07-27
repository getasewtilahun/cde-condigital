import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { DocumentNameSetting } from "../../../redux/Setting/Setting.type";

export type BasicInfoPropType = {
  fetchUser: Function;
  user: ApiCallState<User>;
  form: any;
  setIsModalVisible: Function;
  loadingAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export type CredentialPropType = {
  fetchUser: Function;
  loadingAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  user: ApiCallState<User>;
  form: any;
};
export type DocumentNameSettingPropType = {
  fetchUser: Function;
  loadingAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  user: ApiCallState<User>;
  form: any;
  document_name_setting: ApiCallState<DocumentNameSetting[]>;
  fetchAlldocumentSetting: Function;
};

export const sendPasswordData = (data: any) =>
  axios.put(`${API_BASE_URI}/user/change-password`, data);

export const sendSettingData = (data: any) =>
  axios.post(`${API_BASE_URI}/document-name-setting`, data);

export const sendUserOnlyData = (data: any) =>
  axios.put(`${API_BASE_URI}/user`, data);

export const sendUserSignature = (data: any) =>
  axios.put(`${API_BASE_URI}/user/signature`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

export const removeData = (id: any) =>
  axios.delete(`${API_BASE_URI}/signature/${id}`);
