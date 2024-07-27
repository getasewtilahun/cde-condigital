import Button from "antd/lib/button";
import Table from "antd/lib/table";
import { DownloadOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { connect } from "react-redux";
import { fetchAllDocuments } from "../../../redux/Document/Document.action";
import { Document } from "../../../redux/Document/Document.type";
import { FC, useEffect, useState } from "react";
import { DocumentPropType, Delete, DownloadFile } from "./index.util";
import moment from "moment";
import AddDocumentComponent from "./components/AddDocument/AddDocument.component";
import { DataFormat, ErrorHandler, format } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
  ALLOWED_FILE_SIZE,
  BUILD,
} from "../../../constants/Constants";
import { fetchAllProjects } from "../../../redux/Project/Project.action";
import { setStep } from "../../../redux/Tour/Tour.action";
import ShareDocumentComponent from "./components/ShareDocument/ShareDocument.component";
import UpdateDocumentStatusComponent from "./components/UpdateDocumentStatus/UpdateDocumentStatus.component";
import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import { isNil } from "lodash";

const DocumentComponent: FC<DocumentPropType> = ({
  documents,
  fetchDocument,
  fetchProjects,
  project,
  setStep,
}) => {
  const [_documents, setDocuments] = useState<Document[]>([]);

  const [form] = useForm();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchDocument();
    // setStep({ steps: DOCUMENT_STEP, route: RouteConstants.DOCUMENT });
  }, [fetchDocument]);

  useEffect(() => {
    if (!documents.isPending && isNil(documents.error)) {
      setDocuments(documents.payload.map((el, idx) => ({ ...el, key: idx })));
    }
  }, [documents]);

  const DeleteFile = (id: any) => {
    Delete(id)
      .then(() => {
        fetchDocument();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DOCUMENT_REMOVE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DOCUMENT_REMOVE_FAILED,
            e.message
          )
        );
      });
  };

  const column: ColumnsType<Document> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Reference Number",
      dataIndex: "reference_number",
    },
    {
      title: "Type",
      dataIndex: "type",
    },

    {
      title: "Upload Date",
      render: (value, data) => moment(data.date).format("YYYY-MM-DD HH:MM"),
    },

    {
      title: "Size",
      render: (value, data) => DataFormat(data.size),
    },

    {
      title: "Document Of",
      render: (value, data) => (data.project ? data.project.name : "Company"),
      filters: [
        ...project.payload.map((e) => ({ text: e.name, value: e.name })),
        { text: "Company", value: "-1" },
      ],
      onFilter: (value: any, data: any) =>
        data.project ? data.project?.name.indexOf(value) === 0 : true,
    },
    {
      title: "Share",
      render: (value, record, index) => (
        <div className="d-flex">
          {record.is_private ? (
            <ShareDocumentComponent document={record} />
          ) : null}

          <UpdateDocumentStatusComponent document={record} />
        </div>
      ),
    },
    {
      title: "Action",
      render: (value, data) => (
        <div className="d-inline-flex">
          <Button
            onClick={() => DownloadFile(data)}
            className="btn-outline-secondary"
            icon={<DownloadOutlined />}
          ></Button>
          <Button
            onClick={() => DeleteFile(data.id)}
            className="btn-outline-secondary ml-2"
            icon={<DeleteOutlined />}
          ></Button>
        </div>
      ),
    },
  ];

  const onSearch = (value: any) => {
    let query = value.target.value.toLowerCase();

    setDocuments(
      documents.payload.filter(
        (el, idx) =>
          el.name.toLowerCase().includes(query) ||
          el.type.toLowerCase().includes(query) ||
          el?.reference_number?.toLowerCase().includes(query)
      )
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <Form form={form} layout="vertical" onChange={onSearch}>
            <Form.Item label="Search Documents" name="query">
              <Input.Search placeholder="search....          document name, ref, type" />
            </Form.Item>
          </Form>
        </div>

        <div className="col float-right">
          <ReloadButtonComponent onClick={() => fetchDocument()} />
          <AddDocumentComponent />
        </div>
      </div>

      <Table
        columns={column}
        dataSource={_documents}
        loading={documents.isPending}
        summary={(pageData) => {
          let total_size = 0;

          pageData.forEach(({ size }) => {
            total_size += size;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={1} colSpan={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {`${total_size ? DataFormat(total_size) : "0.00MB"} / ${
                    BUILD === "Enterprise" ? "∞" : DataFormat(ALLOWED_FILE_SIZE)
                  } (${
                    BUILD === "Enterprise"
                      ? "Unlimited"
                      : (total_size
                          ? format(100 * (total_size / ALLOWED_FILE_SIZE))
                          : 0) + "%"
                  })`}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  documents: state.document.fetchAll,
  project: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchDocument: () => dispatch(fetchAllDocuments()),
  fetchProjects: () => dispatch(fetchAllProjects()),
  setStep: (action: any) => dispatch(setStep(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentComponent);
