import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { DocumentAssignment } from "../../../../../../redux/DocumentAssignment/DocumentAssignment.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { UserAssignment } from "../../../../../../redux/UserAssignment/UserAssignment.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { DocumentNameSetting } from "../../../../../../redux/Setting/Setting.type";
import { Reports } from "../../../../../../redux/Reports/Reports.type";

export type ProjectInformationPropType = {
    projects: ApiCallState<Project>;
    fetchProjects: Function;
    users: ApiCallState<User[]>;
    tab: any;
    category: string;
    folder: string;
    sub_folder: string;
    type: string;
};

export type EditWIPPropType = {
    user_assignment: ApiCallState<UserAssignment[]>;
    project: ApiCallState<Project>;
    selected: UserAssignment | undefined;
    users: ApiCallState<User[]>;
    document_assignment: DocumentAssignment;
    document_assignments: ApiCallState<DocumentAssignment[]>;
    fetchAllDocumentAssignment: Function;
    category: string;
    folder: string;
    sub_folder: string;
    type: string;
}

export type ActionStatusPropType = {
    document_assignment: DocumentAssignment;
    project: ApiCallState<Project>;
    fetchAllDocumentAssignment: Function;
    category: string;
    folder: string;
    sub_folder: string;
    type: string;
}



export const sendData = (data: any) =>
    axios.post(API_BASE_URI + "/document-assignment", data, {

    });

export const updateData = (data: any) =>
    axios.put(API_BASE_URI + "/document-assignment", data, {
    });

export const deleteData = (id: number) =>
    axios.delete(API_BASE_URI + `/document-assignment/${id}`);

export const accessAssignDetailData = (
    arr: UserAssignment[],
    user_id: number
) => {
    let revData: any = [];
    let filterData = arr.filter((item: any) => item.user_id === user_id);
    for (let i = 0; i < filterData.length; i++) {
        filterData[i].user_assignment_items
            .filter((e) => e.is_category === false && e.is_folder === false && e.is_sub_folder === false)
            .map((item: any) => {
                revData.push(item);
            });
    }
    return revData;
};

export const documentAssignmentAccessorData = (
    arr: UserAssignment[],
    selected: UserAssignment | undefined
) => {
    let revData: any = [];
    for (let i = 0; i < arr.length; i++) {
        let found = arr[i].user_assignment_items?.find(
            (e) =>
                e.category === selected?.category &&
                e.description === selected?.description &&
                e.folder === selected?.folder &&
                e.sub_folder === selected?.sub_folder &&
                (e.privilege === "Write" ||
                    e.privilege === "Read" ||
                    e.privilege === "Review and Approve")
        );
        if (found) {
            revData.push({
                user_id: arr[i].user_id,
            });
        }
    }
    return revData;
};

export const Originator = [
    { value: "CLNT" },
    { value: "BIMM" },
    { value: "BIMD" },
    { value: "DEMD" },
    { value: "COMD" },
    { value: "OBPL" },
    { value: "STMD" },
    { value: "MEPD" },
    { value: "ELMD" },
    { value: "MEMD" },
    { value: "SAMD" },
];

export const FunctionalBreakdown = [
    { value: "PS" },
    { value: "TS" },
    { value: "ZZ" },
    { value: "XX" },
]

export const Spatial = [
    { value: "SIPL" },
    { value: "00FF" },
    { value: "00CT" },
    { value: "00CB" },
    { value: "01CT" },
    { value: "01FF" },
    { value: "01CB" },
    { value: "02CT" },
    { value: "02FF" },
    { value: "M0CT" },
    { value: "M0FF" },
    { value: "B1CT" },
    { value: "B1FF" },
    { value: "RF05" },
    { value: "FNFT" },
    { value: "FNFB" },
    { value: "ZZZZ" },
    { value: "XXXX" },
];


export const Forms = [
    { value: "DP" },
    { value: "DE" },
    { value: "DS" },
    { value: "DD" },
    { value: "DZ" },
    { value: "DO" },
    { value: "G1" },
    { value: "G2" },
    { value: "G3" },
    { value: "IA" },
    { value: "IM" },
    { value: "LR" },
    { value: "LS" },
    { value: "LQ" },
    { value: "LC" },
    { value: "LP" },
    { value: "LT" },
    { value: "LO" },
    { value: "M0" },
    { value: "MF" },
    { value: "M1" },
    { value: "M2" },
    { value: "TR" },
    { value: "TS" },
    { value: "TC" },
    { value: "TP" },
    { value: "TO" },
    { value: "VA" },
    { value: "VM" },
];

export const Discipline = [
    { value: "ARC" },
    { value: "BEP" },
    { value: "BUS" },
    { value: "CIE" },
    { value: "CPS" },
    { value: "DEM" },
    { value: "EIR" },
    { value: "ELE" },
    { value: "FAM" },
    { value: "HIE" },
    { value: "MEE" },
    { value: "LAA" },
    { value: "QUS" },
    { value: "STE" },
    { value: "SAE" },
    { value: "SAE" },
    { value: "ZZZ" },
    { value: "XXX" },
];