import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { UploadOutlined, QuestionOutlined } from "@ant-design/icons";

import { OpenNotification } from "../../../../../../../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../../../../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../../../../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllRequestForInformation } from "../../../../../../../../../../../../../redux/RequestForInformation/RequestForInformation.action";
import { RFIPropType, sendRequestForInformation } from "../../util/WIP.util";
import { useLocation } from "react-router";

const RFIComponent: FC<RFIPropType> = ({
  users,
  document_assignment,
  documentId,
  reports,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const location = useLocation();
  const path = location.pathname;
  const ProjectID = parseInt(path.split("/")[2]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  console.log("Helloooooooooo", document_assignment);
  // console.log(document_assignment);
  console.log("ggggggggggggggggggggg");
  console.log(document_assignment.payload[0].id);


  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("subject", value.subject);
    formData.append("description", value.description);
    formData.append("project_id", String(ProjectID));
    formData.append("reference_no", value.reference_no);
    formData.append("document_name", document_assignment.payload.find(doc => doc.id === documentId)?.document_name || '');
    formData.append("considered_doc_id", value.considered_doc_id.join(","));
    formData.append("from", `${getUserData().id}`);
    formData.append("date", value.date.format("YYYY-MM-DD"));
    formData.append("assigned_to", value.assigned_to);
    formData.append("cc", value.cc.join(","));
    formData.append("status", "Pending");
    formData.append("file", value?.file?.file);

    // Dynamically compute document_assignment_id
    const documentAssignmentIds = value.considered_doc_id.map((docId: string) => {
      const [document_name, current_status, revision] = docId.split('_');
      const doc = document_assignment.payload.find((d: any) => d.document_name === document_name && d.current_status === current_status && d.revision === revision);
      return doc ? doc.id : '';
    }).filter((id: string) => id !== '').join(',');

    formData.append("document_assignment_id", documentAssignmentIds);

    sendRequestForInformation(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllRequestForInformation();
        OpenNotification(NotificationType.SUCCESS, "Request for Information has been sent!", "");
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed to Send Request for Information!", e.message)
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        style={{ float: "right" }}
        icon={<QuestionOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Request For Information
      </Button>
      <Modal
        className="fixed-modal"
        width={1200}
        centered
        title="New Request For Information"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => form.submit()}
          >
            Send Request
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(),
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Subject Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Description Required!" }]}
              >
                <Input.TextArea autoSize rows={2} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference No"
                name="reference_no"
              // initialValue={document_assignment.payload.find(doc => doc.id === documentId)?.document?.reference_number || ''}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                label="Considered Doc IDs"
                name="considered_doc_id"
                rules={[
                  { required: true, message: "Considered Doc IDs Required!" },
                ]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    documentId === 0 ? (
                      reports.payload
                        .filter((report) => report.project_id === ProjectID)
                        .map((report, i) => (
                          <Select.Option key={i} value={report.document_name}>
                            {report.document_name}
                          </Select.Option>
                        ))
                    ) : (
                      document_assignment.payload
                        .filter((doc) => doc.project_id === ProjectID)
                        .flatMap((doc, i) =>
                          doc.DocumentStatuses
                            .filter((status: any) => status.type_on_status !== 'WIP')
                            .map((status: any, index: any) => (
                              <Select.Option key={`${i}_${index}`} value={`${doc.document_name}_${status.current_status}_${status.revision}`}>
                                {`${doc.document_name}_${status.current_status}_${status.revision}`}
                              </Select.Option>
                            ))
                        )
                    )
                  }

                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker allowClear={false} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="From">
                <Input
                  value={
                    users.payload.find((e) => e.id === getUserData().id)
                      ?.full_name
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Assigned To"
                name="assigned_to"
                rules={[{ required: true, message: "Assigned To Required!" }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i} value={e.id}>
                      {e.full_name} - {e.email}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="CC"
                name="cc"
                rules={[{ required: false, }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.full_name}>
                      {e.full_name} - {e.email}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button className="btn-outline-secondary">
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  document_assignment: state.document_assignment.fetchAll,
  reports: state.reports.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllRequestForInformation: (action: any) =>
    dispatch(fetchAllRequestForInformation(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RFIComponent);
