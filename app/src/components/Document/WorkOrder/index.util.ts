import { DocumentWorkOrder } from "../../../redux/DocumentWorkOrder/DocumentWorkOrder.type";
import { ApiCallState } from "../../../redux/Utils";

export type DocumentWorkOrderPropType = {
  document_work_order: ApiCallState<DocumentWorkOrder[]>;
  fetchDocumentWorkOrder: Function;
};
