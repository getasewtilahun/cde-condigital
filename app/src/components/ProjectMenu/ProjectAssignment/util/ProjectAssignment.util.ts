import { API_BASE_URI } from "../../../../redux/ApiCall";
import axios from "axios";
import { Project } from "../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../redux/Utils";
import { User } from "../../../../redux/User/User.type";
import { UserAssignment } from "../../../../redux/UserAssignment/UserAssignment.type";
import { UserRole } from "../../../../redux/UserRole/UserRole.type";

export type ProjectAssignmentPropType = {
  fetchUsers: Function;
  project: ApiCallState<Project>;
  fetchOneProject: Function;
  users: ApiCallState<User[]>;
  assigned_users: ApiCallState<UserAssignment[]>;
  fetchAssignedUser: Function;
};

export type AddAssignmentPropType = {
  users: ApiCallState<User[]>;
  project: Project;
  fetchAssignedUser: Function;
};

export type EditAssignmentPropType = {
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
  fetchAllAssignedUser: Function;
  assigned_user: ApiCallState<UserAssignment>;
  fetchOneAssignedUser: Function;
  id: number;
}

export type DetailAssignmentPropType = {
  users: ApiCallState<User[]>;
  assigned_user: ApiCallState<UserAssignment>;
  fetchOneAssignedUser: Function;
  id: number;
}

// Function to fetch roles from the backend
export const fetchRolesFromBackend = async (): Promise<UserRole[]> => {
  try {
    const response = await axios.get('/api/roles'); // Adjust the endpoint to your backend
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/user-assign", data);

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/user-assign/${id}`);

export const getUsers = (users: User[], selected: User[]) => {
  return users?.filter(
    (user) =>
      !selected.find((assigned_user) => assigned_user.id === user.id) &&
      user.access_type !== "client"
  );
};

export const Roles = [
  { value: "Client" },
  { value: "Overall BIM Coordinator" },
  { value: "Arc Model Coordinator" },
  { value: " Arch Model Author" },
  { value: "KGStructural Coordinator" },
  { value: " Structural Model Author" },
  { value: "MEP Model Coordinator" },
  { value: "MEP Model Autor" },
  { value: "Electrical Model Autor" },
  { value: "Plumbing Model Author" },
  { value: "Construction Model Author" },
  { value: "Model based quantity Surveyor" },
  { value: "Model Based construction Planner" },
  { value: "Model based construction" },
];

export const sampleAccessDatas = [
  {
    title: "General",
    details: [
      { is_category: true, category: "Standards", title: "General" },
      { is_category: false, category: "Standards", description: "", title: "General", privilege: "No Access" },
      { is_category: true, category: "General Documents", title: "General" },
      { is_category: false, category: "General Documents", title: "General", description: "EIR", privilege: "No Access" },
      { is_category: false, category: "General Documents", title: "General", description: "BEP", privilege: "No Access" },
      { is_category: false, category: "General Documents", title: "General", description: "Cost plans", privilege: "No Access" },
      { is_category: false, category: "General Documents", title: "General", description: "Data drop schedule", privilege: "No Access" },
      { is_category: false, category: "General Documents", title: "General", description: "MIDP", privilege: "No Access" },
      { is_category: false, category: "General Documents", title: "General", description: "Original 2D design", privilege: "No Access" },
      { is_category: false, category: "General Documents", title: "General", description: "Original 3D Model", privilege: "No Access" },
      { is_category: true, category: "Reports", title: "General" },
      { is_category: false, category: "Reports", title: "General", description: "Clash Reports", privilege: "No Access" },
      { is_category: false, category: "Reports", title: "General", description: "Progress report", privilege: "No Access" },
      { is_category: true, category: "Meetings", title: "General" },
      { is_category: false, category: "Meetings", title: "General", description: "", privilege: "No Access" },
    ]
  },
  {
    title: "Architectural",
    details: [
      { is_category: true, category: "Model", title: "Architectural" },
      { is_category: false, category: "Model", title: "Architectural", description: "WIP", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Architectural", description: "Shared", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Architectural", description: "Published", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Architectural", description: "Archived", privilege: "No Access" },
      { is_category: true, category: "Documents", title: "Architectural" },
      { is_category: false, category: "Documents", title: "Architectural", description: "Clash reports", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Architectural", description: "TIDP", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Architectural", description: "Model Quality Check", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Architectural", description: "RFI", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Architectural", description: "Other documents", privilege: "No Access" },
    ]
  },
  {
    title: "Structural",
    details: [
      { is_category: true, category: "Model", title: "Structural" },
      { is_category: false, category: "Model", title: "Structural", description: "WIP", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Structural", description: "Shared", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Structural", description: "Published", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Structural", description: "Archived", privilege: "No Access" },
      { is_category: true, category: "Documents", title: "Structural" },
      { is_category: false, category: "Documents", title: "Structural", description: "Clash reports", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Structural", description: "TIDP", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Structural", description: "Model Quality Check", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Structural", description: "RFI", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Structural", description: "Other documents", privilege: "No Access" },

    ]
  },
  {
    title: "Mechanical",
    details: [
      { is_category: true, category: "Model", title: "Mechanical" },
      { is_category: false, category: "Model", title: "Mechanical", description: "WIP", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Mechanical", description: "Shared", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Mechanical", description: "Published", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Mechanical", description: "Archived", privilege: "No Access" },
      { is_category: true, category: "Documents", title: "Mechanical" },
      { is_category: false, category: "Documents", title: "Mechanical", description: "Clash reports", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Mechanical", description: "TIDP", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Mechanical", description: "Model Quality Check", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Mechanical", description: "RFI", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Mechanical", description: "Other documents", privilege: "No Access" },

    ]
  },
  {
    title: "Electrical",
    details: [
      { is_category: true, category: "Model", title: "Electrical" },
      { is_category: false, category: "Model", title: "Electrical", description: "WIP", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Electrical", description: "Shared", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Electrical", description: "Published", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Electrical", description: "Archived", privilege: "No Access" },
      { is_category: true, category: "Documents", title: "Electrical" },
      { is_category: false, category: "Documents", title: "Electrical", description: "Clash reports", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Electrical", description: "TIDP", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Electrical", description: "Model Quality Check", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Electrical", description: "RFI", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Electrical", description: "Other documents", privilege: "No Access" },

    ]
  },
  {
    title: "Plumbing",
    details: [
      { is_category: true, category: "Model", title: "Plumbing" },
      { is_category: false, category: "Model", title: "Plumbing", description: "WIP", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Plumbing", description: "Shared", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Plumbing", description: "Published", privilege: "No Access" },
      { is_category: false, category: "Model", title: "Plumbing", description: "Archived", privilege: "No Access" },
      { is_category: true, category: "Documents", title: "Plumbing" },
      { is_category: false, category: "Documents", title: "Plumbing", description: "Clash reports", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Plumbing", description: "TIDP", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Plumbing", description: "Model Quality Check", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Plumbing", description: "RFI", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Plumbing", description: "Other documents", privilege: "No Access" },

    ]
  },
  {
    title: "3D Coordination & Clash detection",
    details: [
      { is_category: true, category: "Model", title: "3D Coordination & Clash detection" },
      { is_category: false, category: "Model", title: "3D Coordination & Clash detection", description: "WIP", privilege: "No Access" },
      { is_category: false, category: "Model", title: "3D Coordination & Clash detection", description: "Shared", privilege: "No Access" },
      { is_category: false, category: "Model", title: "3D Coordination & Clash detection", description: "Published", privilege: "No Access" },
      { is_category: false, category: "Model", title: "3D Coordination & Clash detection", description: "Archived", privilege: "No Access" },
      { is_category: true, category: "Documents", title: "3D Coordination & Clash detection" },
      { is_category: false, category: "Documents", title: "3D Coordination & Clash detection", description: "Clash reports", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "3D Coordination & Clash detection", description: "TIDP", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "3D Coordination & Clash detection", description: "Model Quality Check", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "3D Coordination & Clash detection", description: "RFI", privilege: "No Access" },
      { is_category: false, category: "Documents", title: "Plumbing3D Coordination & Clash detection", description: "Other documents", privilege: "No Access" },
    ]

  }
]

export const accessDetailData = (arr: any) => {
  let revData: any = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i].details.map((item: any) => {
      revData.push(item)
    })
  }
  return revData
}

export const sampleAccessDatasUpadted = [
  { is_category: true, no: "1", category: "BIM Documents" },
  { is_category: false, category: "BIM Documents", folder: "", is_folder: true },
  { is_category: false, category: "BIM Documents", folder: "", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "BIM Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "EIR", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "", is_folder: false, is_su_bfolder: false, sub_folder: "", description: "BEP", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Standards", format: "PDF,HTML", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Shared Parameter", format: "PDF,XSL,txt", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: true },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Structural", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Mechanical", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Electrical", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Plumbing", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Federated Model", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "BIM Documents", folder: "TIDP", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Construction information", format: "PDF", privilege: "No Access" },
  { is_category: true, no: "2", category: "Base Documents" },
  { is_category: false, category: "Base Documents", folder: "", is_folder: true },
  { is_category: false, category: "Base Documents", folder: "", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "Base Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Original 2D design", format: "PDF and DWG", privilege: "No Access" },
  { is_category: false, category: "Base Documents", folder: "", is_folder: false, is_su_bfolder: false, sub_folder: "", description: "Original 3D Model", format: "Rvt (native) and IFC", privilege: "No Access" },
  { is_category: false, category: "Base Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Quantity surveying", format: "PDF & xcl", privilege: "No Access" },
  { is_category: false, category: "Base Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Master schedule", format: "PDF,MS project, XSL", privilege: "No Access" },
  { is_category: false, category: "Base Documents", folder: "", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Cost Estimation", format: "PDF & XSL", privilege: "No Access" },
  { is_category: true, no: "3", category: "Model" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: true },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: true, sub_folder: "Architectural" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Architectural", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Architectural", description: "Shared", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Architectural", description: "Published", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Architectural", description: "Archived", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: true, sub_folder: "Structural" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Structural", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Structural", description: "Shared", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Structural", description: "Published", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Structural", description: "Archived", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: true, sub_folder: "Mechanical" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Mechanical", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Mechanical", description: "Shared", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Mechanical", description: "Published", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Mechanical", description: "Archived", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: true, sub_folder: "Electrical" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Electrical", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Electrical", description: "Shared", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Electrical", description: "Published", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Electrical", description: "Archived", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: true, sub_folder: "Plumbing" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Plumbing", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Plumbing", description: "Shared", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Plumbing", description: "Published", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Plumbing", description: "Archived", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: true, sub_folder: "Federated Model" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Federated Model", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Federated Model", description: "Shared", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Federated Model", description: "Published", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.1 Desing information", is_folder: false, is_sub_folder: false, sub_folder: "Federated Model", description: "Archived", format: "Native (Rvt) & IFC ", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: true },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: true, sub_folder: "Site layout and temporary structures" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Site layout and temporary structures", description: "WIP", format: "Native (Rvt)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Site layout and temporary structures", description: "Shared", format: "Native (Rvt) & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Site layout and temporary structures", description: "Published", format: "Native (Rvt) & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Site layout and temporary structures", description: "Archived", format: "Native (Rvt) & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: true, sub_folder: "Construction plan and simulations" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Construction plan and simulations", description: "WIP", format: "Native(BXL)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Construction plan and simulations", description: "Shared", format: "Native(BXL),IFC,Video(AVG)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Construction plan and simulations", description: "Published", format: "Native(BXL),IFC,Video(AVG)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Construction plan and simulations", description: "Archived", format: "Native(BXL),IFC,Video(AVG)", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: true, sub_folder: "Quantity surveying" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Quantity surveying", description: "WIP", format: "BXL, XSL", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Quantity surveying", description: "Shared", format: "BXL, XSL & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Quantity surveying", description: "Published", format: "BXL, XSL & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Quantity surveying", description: "Archived", format: "BXL, XSL & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: true, sub_folder: "Cost Estimation" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Cost Estimation", description: "WIP", format: "Native(BXL) & XSL", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Cost Estimation", description: "Shared", format: "Native(BXL), XSL & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Cost Estimation", description: "Published", format: "Native(BXL), XSL & IFC", privilege: "No Access" },
  { is_category: false, category: "Model", folder: "3.2 Construction information", is_folder: false, is_sub_folder: false, sub_folder: "Cost Estimation", description: "Archived", format: "Native(BXL), XSL & IFC", privilege: "No Access" },
  { is_category: true, no: "4", category: "Clash reports" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: true },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: true, sub_folder: "Design information" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Architectural", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Structural", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Mechanical ", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Electrical", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Plumbing", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Federated Model", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: true, sub_folder: "Construction infor" },
  { is_category: false, category: "Clash reports", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Construction infor", description: "Construction plan", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM Manager", is_folder: true },
  { is_category: false, category: "Clash reports", folder: "BIM Manager", is_folder: false, is_sub_folder: true, sub_folder: "Design information" },
  { is_category: false, category: "Clash reports", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Federated Model", format: "BCF & PDF", privilege: "No Access" },
  { is_category: false, category: "Clash reports", folder: "BIM Manager", is_folder: false, is_sub_folder: true, sub_folder: "Construction info" },
  { is_category: false, category: "Clash reports", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Construction info", description: "Construction plan", format: "BCF & PDF", privilege: "No Access" },
  { is_category: true, no: "5", category: "Model Quality Check" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: true },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: true, sub_folder: "Design information" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Architectural", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Structural", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Mechanical ", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Electrical", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Plumbing", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Federated Model", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: true, sub_folder: "Construction information" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Quantity surveying", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Site layout and template", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Construction plan", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM coordinator", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Cost Estimation", format: "BCF", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: true },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: true, sub_folder: "Design information" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Architectural", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Structural", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Mechanical", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Electrical", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Plumbing", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Design information", description: "Federated Model", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: true, sub_folder: "Construction information" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Quantity surveying", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Site layout and template", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Construction plan", format: "PPT, XSL", privilege: "No Access" },
  { is_category: false, category: "Model Quality Check", folder: "BIM Manager", is_folder: false, is_sub_folder: false, sub_folder: "Construction information", description: "Cost Estimation", format: "PPT, XSL", privilege: "No Access" },
  { is_category: true, no: "6", category: "Other Documents" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: true },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Selection sets", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Custum Breakdown", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Data enreichment", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: false, sub_folder: "", description: "property checker", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: false, sub_folder: "", description: "IFC Model checker", format: "PDF", privilege: "No Access" },
  { is_category: false, category: "Other Documents", folder: "Template", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Cost Data base", format: "PDF", privilege: "No Access" },
  { is_category: true, no: "7", category: "RFI" },
  { is_category: false, category: "RFI", folder: "RFI", is_folder: true },
  { is_category: false, category: "RFI", folder: "RFI", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "RFI", folder: "RFI", is_folder: false, is_sub_folder: false, sub_folder: "", description: "RFI", format: "PDF", privilege: "No Access" },
  { is_category: true, no: "8", category: "Progress report" },
  { is_category: false, category: "Progress report", folder: "Progress report", is_folder: true },
  { is_category: false, category: "Progress report", folder: "Progress report", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "Progress report", folder: "Progress report", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Progress report", format: "PDF, PowerBI", privilege: "No Access" },
  { is_category: true, no: "9", category: "Meetings" },
  { is_category: false, category: "Meetings", folder: "Meetings", is_folder: true },
  { is_category: false, category: "Meetings", folder: "Meetings", is_folder: false, is_sub_folder: true, sub_folder: "" },
  { is_category: false, category: "Meetings", folder: "Meetings", is_folder: false, is_sub_folder: false, sub_folder: "", description: "Meetings", format: "PDF", privilege: "No Access" },
]

