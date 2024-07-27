import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { getUserData } from "../../../utilities/utilities";

export type SharePropType = {
  onShare: Function;
  onRemove: Function;
  feature: string;
  payload: {
    id: number;
    type: "View" | "Check" | "Approve";
    status: number;
    assigned_by: number;
    user_id: number;
  }[];
  loading: boolean;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export const getUsers = (
  users: User[],
  selected: {
    id: number;
    type: "View" | "Check" | "Approve";
    status: number;
    assigned_by: number;
    user_id: number;
  }[],
  type: string
) => {
  // if (type === "Store Requisition") {
  //   if (selected.length === 0) {
  //     return users.filter(
  //       (user) =>
  //         getUserData().id !== user.id &&
  //         !selected.find((status) => status.user_id === user.id) &&
  //         (user.user_role?.name === "Managing Director" ||
  //           user.user_role?.name === "Project Director")
  //     );
  //   } else
  //     return users.filter(
  //       (user) =>
  //         !selected.find((status) => status.user_id === user.id) &&
  //         getUserData().id !== user.id
  //     );
  // } else if (type === "Purchase Requisition") {
  //   if (selected.length === 0) {
  //     return users.filter(
  //       (user) =>
  //         !selected.find((status) => status.user_id === user.id) &&
  //         getUserData().id !== user.id &&
  //         user.user_role?.name === "Store Manager"
  //     );
  //   } else {
  //     let manager_approved = false;
  //     let finance_approved = false;
  //     let project_director_approved = false;

  //     selected.forEach((status) => {
  //       let user = users.find((e) => e.id == status.user_id);
  //       if (user && status.status === 1) {
  //         if (user.user_role?.name === "Store Manager") manager_approved = true;
  //         else if (user.user_role?.name === "Finance") finance_approved = true;
  //         else if (user.user_role?.name === "Project Director")
  //           project_director_approved = true;
  //       }
  //     });
  //     if (manager_approved && finance_approved && project_director_approved) {
  //       return users.filter(
  //         (user) =>
  //           !selected.find((status) => status.user_id === user.id) &&
  //           getUserData().id !== user.id
  //       );
  //     } else if (manager_approved) {
  //       return users.filter(
  //         (user) =>
  //           !selected.find((status) => status.user_id === user.id) &&
  //           getUserData().id !== user.id &&
  //           (user?.user_role?.name === "Finance" ||
  //             user?.user_role?.name === "Project Director")
  //       );
  //     } else {
  //       return users.filter(
  //         (user) =>
  //           !selected.find((status) => status.user_id === user.id) &&
  //           getUserData().id !== user.id &&
  //           user.user_role?.name === "Store Manager"
  //       );
  //     }
  //   }
  // } else
  return users.filter(
    (user) =>
      !selected.find((status) => status.user_id === user.id) &&
      getUserData().id !== user.id
  );
};
