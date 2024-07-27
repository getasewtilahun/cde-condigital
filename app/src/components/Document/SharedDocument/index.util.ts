import { SharedDocument } from "../../../redux/SharedDocument/SharedDocument.type";
import { ApiCallState } from "../../../redux/Utils";

export type SharedDocumentPropType = {
  fetchAllSharedDocuments: Function;
  sharedDocuments: ApiCallState<SharedDocument[]>;
};
