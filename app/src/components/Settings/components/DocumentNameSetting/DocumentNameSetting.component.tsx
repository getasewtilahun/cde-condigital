import { Form, Input, Button } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../constants/Constants";
import { fetchOneUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { DocumentNameSettingPropType, sendSettingData } from "../../util/Setting.util";
import { fetchAllSetting } from "../../../../redux/Setting/Setting.action";

const DocumentNameSettingComponent: FC<DocumentNameSettingPropType> = ({
    fetchUser,
    user,
    form,
    loadingAction,
    document_name_setting,
    fetchAlldocumentSetting,
}) => {
    const [loading, setLoading] = loadingAction;

    // Fetch all document settings on component mount
    useEffect(() => {
        console.log("Fetching all document settings");
        fetchAlldocumentSetting();
    }, [fetchAlldocumentSetting]);

    // Update form fields when document name setting changes
    useEffect(() => {
        console.log("Document name setting updated:", document_name_setting);
        if (document_name_setting.payload && document_name_setting.payload[0]) {
            form.setFieldsValue({ ...document_name_setting.payload[0] });
        }
    }, [document_name_setting, form]);

    // Handle form submission
    const submit = (value: any) => {
        console.log("Form submitted with values:", value);
        setLoading(true);

        let data;
        if (document_name_setting.payload && document_name_setting.payload[0]) {
            // Update existing setting
            data = {
                id: document_name_setting.payload[0].id,
                ...value,
            };
        } else {
            // Create new setting
            data = { ...value };
        }

        sendSettingData(data)
            .then(() => {
                fetchUser(getUserData().id);
                setLoading(false);
                OpenNotification(NotificationType.SUCCESS, "Setting Updated", "");
            })
            .catch((error) => {
                setLoading(false);
                ErrorHandler(error).forEach((e: any) =>
                    OpenNotification(
                        NotificationType.ERROR,
                        "Failed to Update Setting",
                        e.message
                    )
                );
            });
    };

    return (
        <Form layout="vertical" form={form} onFinish={submit}>
            <div className="row">
                <div className="col-md-4">
                    <Form.Item
                        label="Originator"
                        name="Originator"
                        rules={[{ required: true, message: "Originator Required" }]}
                    >
                        <Input type="number" placeholder="originator" />
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item
                        label="Functional Breakdown"
                        name="functional_breakdown"
                        rules={[{ required: true, message: "Functional Breakdown Required" }]}
                    >
                        <Input type="number" placeholder="functional breakdown" />
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item
                        label="Spatial"
                        name="spatial"
                        rules={[{ required: true, message: "Spatial Required" }]}
                    >
                        <Input type="number" placeholder="spatial" />
                    </Form.Item>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Form.Item
                        label="Form"
                        name="form"
                        rules={[{ required: true, message: "Form Required" }]}
                    >
                        <Input type="number" placeholder="form" />
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item
                        label="Discipline"
                        name="discipline"
                        rules={[{ required: true, message: "Discipline Required" }]}
                    >
                        <Input type="number" placeholder="discipline" />
                    </Form.Item>
                </div>
                <div className="col-md-4">
                    <Form.Item
                        label="Number"
                        name="number"
                        rules={[{ required: true, message: "Number Required" }]}
                    >
                        <Input type="number" placeholder="number" />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

// Map state to component props
const mapStateToProps = (state: any) => ({
    user: state.user.fetchOne,
    document_name_setting: state.document_name_setting.fetchAll,
});

// Map dispatch actions to component props
const mapDispatchToProps = (dispatch: any) => ({
    fetchUser: (action: any) => dispatch(fetchOneUser(action)),
    fetchAlldocumentSetting: () => dispatch(fetchAllSetting()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentNameSettingComponent);
