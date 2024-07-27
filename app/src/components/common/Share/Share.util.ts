import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";

export type SharePropType = {
  onShare: Function;
  onRemove: Function;
  payload: {
    id: number;
    type: "View" | "Check" | "Approve";
    status: number;
    assigned_by: number;
    user_id: number;
  }[];
  loading: boolean;
  users: ApiCallState<User[]>;
};
