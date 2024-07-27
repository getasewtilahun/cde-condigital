import { Button, Form, Input, Table, Tag } from "antd";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import { SharedDocumentPropType } from "./index.util";
import { fetchAllSharedDocuments } from "../../../redux/SharedDocument/SharedDocument.action";
import { getUserData } from "../../../utilities/utilities";
import { DownloadFile } from "../MyDocument/index.util";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import { SharedDocument } from "../../../redux/SharedDocument/SharedDocument.type";
import { useForm } from "antd/lib/form/Form";
import { Document } from "../../../redux/Document/Document.type";
import { isNil } from "lodash";

const SharedDocumentComponent: FC<SharedDocumentPropType> = ({
  fetchAllSharedDocuments,
  sharedDocuments,
}) => {
  const [_sharedDocuments, setSharedDocument] = useState<
    {
      key: any;
      shared_by_id: number;
      shared_by_name: string;
      name: string;
      type: string;
      document: Document;
    }[]
  >();
  const [form] = useForm();

  useEffect(() => {
    if (!sharedDocuments.isPending && isNil(sharedDocuments.error)) {
      setSharedDocument(
        sharedDocuments.payload.map((item: SharedDocument, index: number) => {
          return {
            key: index,
            shared_by_id: item.shared_by_id,
            shared_by_name: item.shared_by?.full_name,
            name: item.document?.name,
            type: item.document?.type,
            document: item.document,
          };
        })
      );
    }
  }, [sharedDocuments]);

  useEffect(() => {
    fetchAllSharedDocuments({ user_id: getUserData().id });
  }, []);

  const onSearch = (value: any) => {
    let query = value.target.value.toLowerCase();

    setSharedDocument(
      sharedDocuments.payload
        .filter(
          (el, idx) =>
            el?.document.name.toLowerCase().includes(query) ||
            el?.document.type.toLowerCase().includes(query) ||
            el?.document.reference_number?.toLowerCase().includes(query)
        )
        .map((item, index) => ({
          key: index,
          shared_by_id: item.shared_by_id,
          shared_by_name: item.shared_by?.full_name,
          name: item.document?.name,
          type: item.document?.type,
          document: item.document,
        }))
    );
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <Form form={form} layout="vertical" onChange={onSearch}>
          <Form.Item label="Search Documents" name="query">
            <Input.Search placeholder="search....          document name, ref, type" />
          </Form.Item>
        </Form>
      </div>
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() => fetchAllSharedDocuments({ user_id: getUserData().id })}
        />
      </div>
      <div className="col-md-12 mt-2">
        <Table
          columns={[
            {
              title: "No.",
              render: (value, record, index) => index + 1,
            },
            {
              title: "Reference Number",
              dataIndex: "document",
              render: (value) => value.reference_number,
            },
            {
              title: "Document Name",
              dataIndex: "name",
            },
            {
              title: "Document Type",
              dataIndex: "type",
            },
            {
              title: "Shared By",
              dataIndex: "shared_by",
              render: (value, record, index) =>
                record.shared_by_id === getUserData().id ? (
                  <Tag color="cyan">{getUserData().full_name}(You)</Tag>
                ) : (
                  <Tag color="green">{record.shared_by_name}</Tag>
                ),
            },
            {
              title: "Action",
              render: (value, record, index) => (
                <>
                  <Button
                    className="btn-outline-secondary"
                    onClick={() => DownloadFile(record.document)}
                    icon={<DownloadOutlined />}
                  />
                </>
              ),
            },
          ]}
          loading={sharedDocuments.isPending}
          dataSource={_sharedDocuments}
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
  sharedDocuments: state.sharedDocument.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllSharedDocuments: (data: any) =>
    dispatch(fetchAllSharedDocuments(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedDocumentComponent);
