import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./User/User.reducer";

import LogReducer from "./Log/Log.reducer";
import UserSeenReducer from "./UserSeen/UserSeen.reducer";
import UserRoleReducer from "./UserRole/UserRole.reducer";
import UserAssignmentReducer from "./UserAssignment/UserAssignment.reducer";
import ProjectReducer from "./Project/Project.reducer";
import DocumentReducer from "./Document/Document.reducer";
import DocumentAssignmentReducer from "./DocumentAssignment/DocumentAssignment.reducer";
import RequestForInformationReducer from "./RequestForInformation/RequestForInformation.reducer";
import ReviewForApprovalReducer from "./ReviewForApproval/ReviewForApproval.reducer";
import ScheduleMeetingReducer from "./ScheduleMeeting/ScheduleMeeting.reducer";
import ReportsReducer from "./Reports/Reports.reducer";
import DocumentNameSettingReducer from "./Setting/Setting.reducer";
import RequestForInformationStatusReducer from './RequestForInformationStatus/RequestForInformationStatus.reducer';
import CommunicationMessageReducer from './CommunicationMessage/CommunicationMessage.reducer';
import CommunicationGroupReducer from './CommunicationGroup/CommunicationGroup.reducer';
import OrganizationReducer from './Organization/Organization.reducer';

const PersistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const RootReducer = combineReducers({
  user: UserReducer,
  log: LogReducer,
  user_seen: UserSeenReducer,
  user_role: UserRoleReducer,
  user_assignment: UserAssignmentReducer,
  project: ProjectReducer,
  document: DocumentReducer,
  document_assignment: DocumentAssignmentReducer,
  schedule_meeting: ScheduleMeetingReducer,
  review_for_approval: ReviewForApprovalReducer,
  request_for_information: RequestForInformationReducer,
  request_for_information_status: RequestForInformationStatusReducer,
  reports: ReportsReducer,
  document_name_setting: DocumentNameSettingReducer,
  communication_message: CommunicationMessageReducer,
  communication_group: CommunicationGroupReducer,
  organization: OrganizationReducer,
});

export default persistReducer(PersistConfig, RootReducer);
