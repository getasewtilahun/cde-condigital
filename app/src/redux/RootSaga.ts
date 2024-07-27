import { all, call } from "redux-saga/effects";
import {
  watcherFetchAllLogs,
  watcherFetchOneLogs,
  watcherFetchPagedLogs,
} from "./Log/Log.saga";
import {
  watcherFetchAllUser,
  // watcherFetchFeatureUser,
  watcherFetchOneUser,
} from "./User/User.saga";

import {
  watcherFetchAllUserSeens,
  watcherSetUserSeens,
} from "./UserSeen/UserSeen.saga";

import {
  watcherFetchAllUserRoles,
  watcherFetchOneUserRoles,
  watcherFetchPagedUserRoles,
} from "./UserRole/UserRole.saga";

import {
  watcherFetchAllRequestForInformations,
  watcherFetchOneRequestForInformations,
  // watcherFetchPagedRequestForInformations,
} from "./RequestForInformation/RequestForInformation.saga";
import {
  watcherFetchAllRequestForInformationsStatus,
  watcherFetchOneRequestForInformationsStatus,
  // watcherFetchPagedRequestForInformations,
} from "./RequestForInformationStatus/RequestForInformationStatus.saga";
import {
  watcherFetchAllReviewForApprovals,
  watcherFetchOneReviewForApprovals,
  // watcherFetchPagedReviewForApprovals,
} from "./ReviewForApproval/ReviewForApproval.saga";
import {
  watcherFetchAllScheduleMeetings,
  watcherFetchOneScheduleMeetings,
  // watcherFetchPagedScheduleMeetings,
} from "./ScheduleMeeting/ScheduleMeeting.saga";

import {
  watcherFetchAllDocumentAssignments,
  watcherFetchOneDocumentAssignments,
  // watcherFetchPagedDocumentAssignments,
} from "./DocumentAssignment/DocumentAssignment.saga";
import {
  watcherFetchAllReportss,
  watcherFetchOneReportss,
  // watcherFetchPagedReportss,
} from "./Reports/Reports.saga";

import {
  watcherFetchAllUserAssignments,
  watcherFetchOneUserAssignments,
  // watcherFetchPagedUserAssignments,
} from "./UserAssignment/UserAssignment.saga";

import {
  watcherFetchAllProjects,
  watcherFetchOneProjects,
  watcherFetchPagedProjects,
} from "./Project/Project.saga";
import {
  watcherFetchAllOrganizations,
  watcherFetchOneOrganizations,
  watcherFetchPagedOrganizations,
} from "./Organization/Organization.saga";
import {
  watcherFetchAllDocuments,
  // watcherFetchOneDocuments,
  // watcherFetchPagedDocuments,
} from "./Document/Document.saga";
import {
  watcherFetchAllSettings,
  watcherFetchOneSettings,
  watcherFetchPagedSettings,
} from "./Setting/Setting.saga";

import {
  watcherFetchPagedCommunicationMessages,
  watcherSearchCommunicationMessages,
} from "./CommunicationMessage/CommunicationMessage.saga";
import {
  watcherFetchAllCommunicationGroups,
  watcherFetchAllCommunicationGroupUsers,
} from "./CommunicationGroup/CommunicationGroup.saga";


export default function* RootSaga() {
  yield all([
    call(watcherFetchAllLogs),
    call(watcherFetchOneLogs),
    call(watcherFetchPagedLogs),
    call(watcherFetchAllUser),
    call(watcherFetchOneUser),
    call(watcherFetchAllUserSeens),
    call(watcherSetUserSeens),
    call(watcherFetchAllUserRoles),
    call(watcherFetchOneUserRoles),
    call(watcherFetchPagedUserRoles),
    call(watcherFetchAllUserAssignments),
    call(watcherFetchOneUserAssignments),
    // call(watcherFetchPagedUserAssignments),
    call(watcherFetchAllDocumentAssignments),
    call(watcherFetchOneDocumentAssignments),
    // call(watcherFetchPagedDocumentAssignments),

    // call(watcherFetchFeatureUser),

    call(watcherFetchAllProjects),
    call(watcherFetchOneProjects),
    call(watcherFetchPagedProjects),

    call(watcherFetchAllOrganizations),
    call(watcherFetchOneOrganizations),
    call(watcherFetchPagedOrganizations),

    call(watcherFetchAllRequestForInformations),
    call(watcherFetchOneRequestForInformations),
    // call(watcherFetchPagedRequestForInformations),
    call(watcherFetchAllReviewForApprovals),
    call(watcherFetchOneReviewForApprovals),
    // call(watcherFetchPagedReviewForApprovals),
    call(watcherFetchAllScheduleMeetings),
    call(watcherFetchOneScheduleMeetings),
    // call(watcherFetchPagedScheduleMeetings),
    call(watcherFetchAllReportss),
    call(watcherFetchOneReportss),
    // call(watcherFetchPagedReportss),
    call(watcherFetchAllDocuments),
    // call(watcherFetchOneDocuments),
    // call(watcherFetchPagedDocuments),

    call(watcherFetchAllSettings),
    call(watcherFetchOneSettings),
    call(watcherFetchPagedSettings),

    call(watcherFetchAllRequestForInformationsStatus),
    call(watcherFetchOneRequestForInformationsStatus),

    call(watcherFetchPagedCommunicationMessages),
    call(watcherSearchCommunicationMessages),

    call(watcherFetchAllCommunicationGroups),
    call(watcherFetchAllCommunicationGroupUsers),
  ]);
}
