import { AutoComplete, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../../../../../../common/Notification/Notification.component";


import { NotificationType } from "../../../../../../../../../constants/Constants";
import {
    ErrorHandler,
    getUserData,
    zeroPad,
} from "../../../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllDocumentAssignment } from "../../../../../../../../../redux/DocumentAssignment/DocumentAssignment.action";
import { useLocation } from "react-router";
import { fetchOneProject } from "../../../../../../../../../redux/Project/Project.action";
import { fetchAllSetting } from "../../../../../../../../..//redux/Setting/Setting.action";
import { AddDocumentPropType, Discipline, documentAssignmentAccessorData, Forms, FunctionalBreakdown, Originator, sendData, Spatial } from "../util/SharedDocumentAndRI.util";

const AddDocumentComponent: FC<AddDocumentPropType> = ({
    user_assignment,
    selected,
    project,
    users,
    document_assignment,
    fetchAllDocumentAssignment,
    category,
    folder,
    sub_folder,
    fetchOneProject,
    fetchAlldocumentSetting,
    document_name_setting,
    type,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [optionsOriginator, setOptionsOriginator] = useState<{ value: string }[]>([]);
    const [optionsFunctionalBreakdown, setOptionsFunctionalBreakdown] = useState<{ value: string }[]>([]);
    const [optionsSpatial, setOptionsSpatial] = useState<{ value: string }[]>([]);
    const [optionsForms, setOptionsForms] = useState<{ value: string }[]>([]);
    const [optionsDiscipline, setOptionsDiscipline] = useState<{ value: string }[]>([]);
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
        fetchOneProject(project_id);
    }, []);

    useEffect(() => {
        setNumberCode(`${document_assignment.payload.length + 1}`);
    }, [isModalVisible, document_assignment]);

    useEffect(() => {
        console.log("Fetching all document settings");
        fetchAlldocumentSetting();
    }, [fetchAlldocumentSetting]);

    const handleOk = () => {
        setIsModalVisible(false);
        form.resetFields();
        setLoading(false);
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
        formData.append("project_id", project.payload.code);
        formData.append("type", type);
        formData.append("sub_folder", sub_folder);
        formData.append("author", `${getUserData().id}`);
        formData.append("date", value.date.format(dateFormat));
        formData.append(
            "document_name",
            `${project.payload.code}-${originator}-${functional_breakdown}-${spatial}-${forms}-${discipline}-${zeroPad(number_code, 2)}`
        );
        formData.append("description", value.description);
        formData.append("statu_s", "Private");
        // formData.append("revision", value.revision);
        formData.append("version", value.version);
        // formData.append("classification", value.classification);
        formData.append("format", value.format);
        formData.append("remark", value.remark);
        formData.append("originato_r", value.originato_r);
        formData.append("file", value?.file?.file);
        formData.append(
            "document_assignment_access",
            JSON.stringify(
                documentAccessor.map((item: any) => ({
                    ...item,
                }))
            )
        );

        sendData(formData)
            .then(() => {
                handleOk();
                setLoading(false);
                form.resetFields();
                fetchAllDocumentAssignment({
                    project_id: project.payload.id,
                    category: category,
                    folder: folder,
                    sub_folder: sub_folder,
                    type: type,
                });
                OpenNotification(NotificationType.SUCCESS, "Document saved!", "");
            })
            .catch((error) => {
                setLoading(false);

                ErrorHandler(error).map((e: any) =>
                    OpenNotification(
                        NotificationType.ERROR,
                        "Failed to save document",
                        e.message
                    )
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

    const [errorMessage, setErrorMessage] = useState<string>('');

    const onChangeHandlerDocumentName = (name: string, value: string) => {

        if (name === "Originator" || name === "functional_breakdown" || name === "spatial" || name === "form" || name === "discipline" || name === "number") {
            // const propertyName = name.toLowerCase();
            const maxLength = parseInt((document_name_setting.payload[0] as any)[name], 10);
            if (value.length <= maxLength) {
                switch (name) {
                    case "Originator":
                        setOriginator(value);
                        break;
                    case "functional_breakdown":
                        setFunctionalBreakdown(value);
                        break;
                    case "spatial":
                        setSpatial(value);
                        break;
                    case "form":
                        setForms(value);
                        break;
                    case "discipline":
                        setDiscipline(value);
                        break;
                    case "number":
                        setNumberCode(value);
                        break;
                    default:
                        break;
                }
                setErrorMessage('');
            } else {
                setErrorMessage(` "${name}" must be ${maxLength} characters.`);
            }
        }

    };

    return (
        <>
            <Button
                className="btn-outline-secondary"
                style={{ float: "right" }}
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                New Document
            </Button>
            <Modal
                className="fixed-modal"
                width={1100}
                style={{ top: 35 }}
                title="New Document"
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
                        Upload
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
                                            placeholder="project code"
                                            value={project.payload.code}
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsOriginator}
                                            onSearch={onSearchOriginator}
                                            placeholder="Originators"
                                            onChange={(e: string) => onChangeHandlerDocumentName("Originator", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
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
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsForms}
                                            onSearch={onSearchForms}
                                            placeholder="Form"
                                            onChange={(e: string) => onChangeHandlerDocumentName("form", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
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
                                        />
                                    </Col>
                                    {"-"}
                                    <Col span={4}>
                                        <AutoComplete
                                            options={optionsDiscipline}
                                            onSearch={onSearchDiscipline}
                                            placeholder="Number"
                                            onChange={(e: string) => onChangeHandlerDocumentName("number", e)}
                                            filterOption={(inputValue: any, option: any) =>
                                                option!.value
                                                    .toUpperCase()
                                                    .indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                        />
                                        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
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
                            <Form.Item label="Version" name="version"
                                rules={[{ required: true, message: "Please enter version" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Author">
                                <Input value={users.payload.find((e) => e.id === getUserData().id)?.full_name} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item
                                label="Originator"
                                name="originato_r"
                                rules={[{ required: true, message: "Please select an Originator" }]}
                            >
                                <Select placeholder="Please select an originator">
                                    {options.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
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
                        <div className="col-md-6">
                            {(type === "Plan" || type === "ProductionMethodsAndProcedure" || type === "Requirement" || type === "Standard") && (
                                <Form.Item label="Remark" name="remark" rules={[{}]}>
                                    <Input />
                                </Form.Item>
                            )}
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
    user_assignment: state.user_assignment.fetchAll,
    project: state.project.fetchOne,
    users: state.user.fetchAll,
    document_assignment: state.document_assignment.fetchAll,
    document_name_setting: state.document_name_setting.fetchAll,

});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
    fetchAllDocumentAssignment: (action: any) => dispatch(fetchAllDocumentAssignment(action)),
    fetchOneProject: (action: any) => dispatch(fetchOneProject(action)),
    fetchAlldocumentSetting: () => dispatch(fetchAllSetting()),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentComponent);
