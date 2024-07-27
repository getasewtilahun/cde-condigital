import { AutoComplete, Button, Col, DatePicker, Form, Input, Modal, Row, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

import { OpenNotification } from "../../../../../../../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../../../../../../../constants/Constants";
import { ErrorHandler, getUserData, zeroPad } from "../../../../../../../../../../../../../utilities/utilities";
import moment from "moment";
import {
    Discipline,
    documentAssignmentAccessorData,
    Forms,
    FunctionalBreakdown,
    Originator,
    Spatial,
    updateData,
} from "../../../Shared/util/Shared.util";
import { fetchAllDocumentAssignment } from "../../../../../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { useLocation } from "react-router";
import React from "react";


const EditSharedComponent: FC<any> = ({
    user_assignment,
    selected,
    project,
    users,
    document_assignment,
    document_assignments,
    fetchAllDocumentAssignment,
    category,
    folder,
    sub_folder,
    type
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [optionsOriginator, setOptionsOriginator] = useState<{ value: string }[]>([]);
    const [optionsFunctionalBreakdown, setOptionsFunctionalBreakdown] = useState<{ value: string }[]>([]);
    const [optionsSpatial, setOptionsSpatial] = useState<{ value: string }[]>([]);
    const [optionsForms, setOptionsForms] = useState<{ value: string }[]>([]);
    const [optionsDiscipline, setOptionsDiscipline] = useState<{ value: string }[]>([]);
    const [projectCode, setProjectCode] = useState("");
    const [originator, setOriginator] = useState("");
    const [functional_breakdown, setFunctionalBreakdown] = useState("");
    const [spatial, setSpatial] = useState("");
    const [forms, setForms] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [number_code, setNumberCode] = useState("");
    const [form] = Form.useForm();
    const dateFormat = "DD/MM/YYYY";

    const location = useLocation();
    const path = location.pathname;
    const project_id = path.split('/')[2];

    useEffect(() => {
        const docNameParts = document_assignment.document_name.split("-");
        const [projectCode, originator, functionalBreakdown, spatial, form, discipline, numberCode] = docNameParts;
        setProjectCode(projectCode);
        setOriginator(originator);
        setFunctionalBreakdown(functionalBreakdown);
        setSpatial(spatial);
        setForms(form);
        setDiscipline(discipline);
        setNumberCode(numberCode);
    }, [document_assignment]);

    // useEffect(() => {
    //     setNumberCode(`${document_assignments.payload.length + 1}`)
    // }, [isModalVisible, document_assignments]);

    const handleOk = () => {
        setIsModalVisible(false);
        form.resetFields();
        setLoading(false);
        setProjectCode("");
        setOriginator("");
        setFunctionalBreakdown("");
        setSpatial("");
        setForms("");
        setDiscipline("");
        setNumberCode("");
    };

    const Submit = (value: any) => {
        setLoading(true);
        const documentAccessor = documentAssignmentAccessorData(
            user_assignment.payload,
            selected
        );

        let formData = new FormData();
        formData.append("user_assignment_item_id", `${selected?.id}`);
        formData.append("project_id", project_id);
        formData.append("type", type);
        formData.append("author", `${getUserData().id}`);
        formData.append("date", value.date.format(dateFormat));
        formData.append(
            "document_name",
            `${projectCode}-${originator}-${functional_breakdown}-${spatial}-${forms}-${discipline}-${zeroPad(number_code, 2)}`
        );
        formData.append("description", value.description);
        formData.append("id", document_assignment.id.toString());
        formData.append("status", "S0");
        formData.append("revision", value.revision);
        formData.append("classification", value.classification);
        formData.append("format", value.format);
        formData.append("file", value?.file?.file);
        formData.append(
            "document_assignment_access",
            JSON.stringify(documentAccessor.map((item: any) => ({ ...item })))
        );

        updateData(formData)
            .then(() => {
                handleOk();
                setLoading(false);
                fetchAllDocumentAssignment({
                    project_id: project.payload.id,
                    category,
                    folder,
                    sub_folder,
                    type,
                });
                OpenNotification(NotificationType.SUCCESS, "Document Updated!", "");
            })
            .catch((error) => {
                setLoading(false);
                ErrorHandler(error).map((e) =>
                    OpenNotification(NotificationType.ERROR, "Failed to save document", e.message)
                );
            });
    };

    const onSearchOriginator = (searchText: string) => {
        const arr = [{ value: searchText }, ...Originator];
        setOptionsOriginator(!searchText ? [] : arr);
    };

    const onSearchFunctionalBreakdown = (searchText: string) => {
        const arr = [{ value: searchText }, ...FunctionalBreakdown];
        setOptionsFunctionalBreakdown(!searchText ? [] : arr);
    };

    const onSearchSpatial = (searchText: string) => {
        const arr = [{ value: searchText }, ...Spatial];
        setOptionsSpatial(!searchText ? [] : arr);
    };

    const onSearchForms = (searchText: string) => {
        const arr = [{ value: searchText }, ...Forms];
        setOptionsForms(!searchText ? [] : arr);
    };

    const onSearchDiscipline = (searchText: string) => {
        const arr = [{ value: searchText }, ...Discipline];
        setOptionsDiscipline(!searchText ? [] : arr);
    };

    const onChangeHandlerDocumentName = (name: string, value: string) => {
        if (name === "originator") {
            setOriginator(value);
        } else if (name === "functional_breakdown") {
            setFunctionalBreakdown(value);
        } else if (name === "spatial") {
            setSpatial(value);
        } else if (name === "forms") {
            setForms(value);
        } else if (name === "discipline") {
            setDiscipline(value);
        } else if (name === "number_code") {
            setNumberCode(value);
        }
    };

    return (
        <>
            <Button
                type="text"
                style={{ float: "right" }}
                icon={<EditOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                Edit
            </Button>
            <Modal
                className="fixed-modal"
                width={1100}
                style={{ top: 35 }}
                title="Edit Document"
                visible={isModalVisible}
                onCancel={handleOk}
                footer={[
                    <>
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            onClick={() => form.submit()}
                        >
                            Upload
                        </Button>
                    </>,
                ]}
            >
                <Form
                    layout="vertical"
                    onFinish={Submit}
                    form={form}
                    initialValues={{
                        ...document_assignment,
                        date: moment(document_assignment.date),
                    }}
                >
                    <div className="row">
                        <div className="col-md-4">
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: "Please input Date" }]}
                            >
                                <DatePicker allowClear={false} format={dateFormat} />
                            </Form.Item>
                        </div>
                        <div className="col-md-8">
                            <Form.Item label="Document ID">
                                <Row>
                                    <Col span={4}>
                                        <Input
                                            placeholder="Project Code"
                                            value={projectCode}
                                            disabled
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsOriginator}
                                            onSearch={onSearchOriginator}
                                            placeholder="Originators"
                                            onChange={(e: string) => onChangeHandlerDocumentName("originator", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            value={originator}
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsFunctionalBreakdown}
                                            onSearch={onSearchFunctionalBreakdown}
                                            placeholder="Functional Breakdown"
                                            onChange={(e: string) => onChangeHandlerDocumentName("functional_breakdown", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            value={functional_breakdown}
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsSpatial}
                                            onSearch={onSearchSpatial}
                                            placeholder="Spatial"
                                            onChange={(e: string) => onChangeHandlerDocumentName("spatial", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            value={spatial}
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsForms}
                                            onSearch={onSearchForms}
                                            placeholder="Form"
                                            onChange={(e: string) => onChangeHandlerDocumentName("forms", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            value={forms}
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsDiscipline}
                                            onSearch={onSearchDiscipline}
                                            placeholder="Discipline"
                                            onChange={(e: string) => onChangeHandlerDocumentName("discipline", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            value={discipline}
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <Input
                                            placeholder="Number"
                                            value={zeroPad(number_code, 2)}
                                            onChange={(e: any) => onChangeHandlerDocumentName("number_code", e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Description" name="description">
                                <Input.TextArea autoSize rows={2} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Status">
                                <Input value={"S0"} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Revision" name="revision">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item
                                label="Author"
                            >
                                <Input value={users.payload.find((e: any) => e.id === getUserData().id)?.full_name} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Classification" name="classification">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Format" name="format">
                                <Input />
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

const mapStateToProps = (state: any) => ({
    user_assignment: state.user_assignment.fetchAll,
    project: state.project.fetchOne,
    users: state.user.fetchAll,
    document_assignments: state.document_assignment.fetchAll,
});


const mapDispatchToProps = (dispatch: any) => ({
    fetchAllDocumentAssignment: (action: any) => dispatch(fetchAllDocumentAssignment(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSharedComponent);
