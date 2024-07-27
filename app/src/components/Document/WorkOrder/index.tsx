import { Button } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllDocumentWorkOrders } from "../../../redux/DocumentWorkOrder/DocumentWorkOrder.action";
import { DocumentWorkOrder } from "../../../redux/DocumentWorkOrder/DocumentWorkOrder.type";
import AddDocumentWorkOrderComponent from "./components/AddDocumentWorkOrder/AddDocumentWorkOrder.component";
import DetailDocumentWorkOrderComponent from "./components/DetailDocumentWorkOrder/DetailDocumentWorkOrder.component";
import { DocumentWorkOrderPropType } from "./index.util";
const WorkOrderComponent: FC<DocumentWorkOrderPropType> = ({
  fetchDocumentWorkOrder,
  document_work_order,
}) => {
  const columns: ColumnsType<DocumentWorkOrder> = [
    {
      title: "No",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Assigned By",
      render: (value, record) =>
        record?.assigned_to_staff.map(
          (e, index, array) =>
            `${e.name}${array.length - 1 > index ? ", " : ""}`
        ),
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      render: (value, record) => (
        <DetailDocumentWorkOrderComponent data={record} />
      ),
    },
  ];

  useEffect(() => {
    fetchDocumentWorkOrder();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <AddDocumentWorkOrderComponent />
      </div>
      <div className="col-md-12 mt-2">
        <Table
          columns={columns}
          dataSource={document_work_order.payload}
          loading={document_work_order.isPending}
        />
      </div>
    </div>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  document_work_order: state.document_work_order.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchDocumentWorkOrder: () => dispatch(fetchAllDocumentWorkOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderComponent);
