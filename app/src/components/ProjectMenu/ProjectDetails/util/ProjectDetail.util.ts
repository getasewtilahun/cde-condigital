import { API_BASE_URI } from "../../../../redux/ApiCall";
import axios from "axios";
import { Project } from "../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../redux/Utils";
import { User } from "../../../../redux/User/User.type";
import { UserAssignment } from "../../../../redux/UserAssignment/UserAssignment.type";
import { UserRole } from "../../../../redux/UserRole/UserRole.type";

export type ProjectDetailPropType = {
    projects: ApiCallState<Project[]>;
    fetchProjects: Function;
};


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


export const accessDetailData = (arr: any) => {
    let revData: any = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i].details.map((item: any) => {
            revData.push(item)
        })
    }
    return revData
}



