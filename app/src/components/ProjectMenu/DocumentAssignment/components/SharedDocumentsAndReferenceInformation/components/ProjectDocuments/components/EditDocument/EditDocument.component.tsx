import { AutoComplete, Button, Col, DatePicker, Form, Input, Modal, Select, Row, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Discipline,
    documentAssignmentAccessorData,
    Forms,
    FunctionalBreakdown,
    Originator,
    Spatial,
    updateData,
} from "../../util/ProjectDocuments.util";
import { OpenNotification } from "../../../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../../../constants/Constants";
import { ErrorHandler, getUserData, zeroPad } from "../../../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllDocumentAssignment } from "../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { useLocation } from "react-router";

const EditDocumentComponent: FC<any> = ({
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

    const { Option } = Select;

    const options = [
        "Appointing party",
        "Lead Appointed Party",
        "Overall BIM Coordinator",
        "Arc model coordinator",
        "Arch model Author",
        "ST Coordinator",
        "ST model Author",
        "MEP model coordinator",
        "Mechanical model author",
        "Electrical model Author",
        "Plumbing Model Author",
        "Construction Model Coordinator",
        "Model based quantity surveyor",
        "Model based construction planner",
        "model based cost estimation",
    ];

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
        formData.append("project_id", project_id);
        formData.append("type", type);
        formData.append("author", `${getUserData().id}`);
        formData.append("date", value.date.format(dateFormat));
        formData.append(
            "document_name",
            `${projectCode}-${originator}-${functional_breakdown}-${spatial}-${forms}-${discipline}-${number_code}`
        );
        formData.append("description", value.description);
        formData.append("id", document_assignment.id.toString());
        formData.append("remark", value.remark);
        formData.append("originato_r", value.originato_r);
        formData.append("version", value.version);
        formData.append("format", value.format);
        formData.append("file", value?.file?.file);

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
                                            name="projectCode"
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
                                        <AutoComplete
                                            options={optionsDiscipline}
                                            onSearch={onSearchDiscipline}
                                            placeholder="Number"
                                            onChange={(e: string) => onChangeHandlerDocumentName("number_code", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            value={number_code}
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
                            <Form.Item label="Version" name="version">
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
                            <Form.Item
                                name="originato_r"
                                label="Originator"
                                rules={[{ required: true, message: "Please input Originator" }]}
                            >
                                <Select>
                                    {options.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Format" name="format">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            {(type === "Plan" || type === "ProductionMethodsAndProcedure" || type === "Requirement" || type === "Standard") && (
                                <Form.Item label="Remark" name="remark">
                                    <Input />
                                </Form.Item>
                            )}
                        </div>
                        <div className="col-md-6">
                            <Form.Item
                                label="File"
                                // rules={[{ required: true, message: "Please input File" }]}
                                name="file"
                            >
                                <Upload
                                    defaultFileList={[{ uid: '-1', name: document_assignment.document.name, status: 'done', url: document_assignment.document.url }]}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDocumentComponent);
