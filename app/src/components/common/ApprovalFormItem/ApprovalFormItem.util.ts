import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";

export type ApprovalFormItemPropType = {
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  is_inventory?: Boolean;
  issued?: boolean;
  approverOnly?: boolean;
  checkerOnly?: boolean;
  fetchFeatureUser?: Function;
  featureUsers?: ApiCallState<User[]>;
  approvingUser?: User[];
  checkingUser?: User[];
  approver_required?: boolean;
  has_checked_by?: boolean;
};
