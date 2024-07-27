import { AutoComplete, Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { ErrorHandler, getUserData } from "../../../../../../../utilities/utilities";
import moment from "moment";
import { useLocation } from "react-router";
import { fetchOneProject } from "../../../../../../../redux/Project/Project.action";
import { EditOrganizationPropType, updateData } from "../../util/Organization.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllOrganization } from "../../../../../../../redux/Organization/Organization.action";

const EditOrganizationComponent: FC<EditOrganizationPropType> = ({
    project,
    organizations,
    fetchOrganizations,
    users,
    fetchOneProject,
    type,
    id,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [contactOptions, setContactOptions] = useState<any[]>([]);
    const [organizationData, setOrganizationData] = useState<any>(null); // To store filtered organization data
    const dateFormat = "YYYY-MM-DD";

    const location = useLocation();
    const path = location.pathname;
    const project_id = path.split('/')[2];

    useEffect(() => {
        if (organizations && organizations.payload && id) {
            const org = organizations.payload.find((org: any) => org.id === id);
            if (org) {
                setOrganizationData(org);
                form.setFieldsValue({
                    ...org,
                    date: moment(org.date, dateFormat), // Ensure the date is in the correct format
                });
            }
        }
    }, [organizations, id]);

    useEffect(() => {
        const options = users.payload.map(user => ({
            value: user.id,
            label: user.full_name,
        }));
        setContactOptions(options);
    }, [users]);

    const handleOk = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const descriptions = [
        "Appointing party (Project Owner)",
        "Lead Appointed party 1 (Design and Engineering firm)",
        "Lead Appointed party 2 (Contractor)",
        "Appointed party 1",
        "Appointed party 2",
        "Appointed party 3",
    ];

    const handleSelectContact = (value: string) => {
        const selectedUser = users.payload.find(user => user.id === Number(value));

        if (selectedUser) {
            form.setFieldsValue({ key_contact_person: selectedUser.full_name });
        }
    };

    const Submit = (value: any) => {
        setLoading(true);

        const data: { [key: string]: any } = {
            id: id,
            project_id: String(project.payload.code),
            author: `${getUserData().id}`,
            date: value.date.format(dateFormat),
            name: value.name,
            code: value.code,
            specialization: value.specialization,
            location: value.location,
            website: value.website,
            email: value.email,
            phone: value.phone,
            key_contact_person: value.key_contact_person || '',
            category: value.category,
        };

        updateData(data)
            .then(() => {
                setLoading(false);
                form.resetFields();
                handleOk();
                fetchOrganizations({
                    project_id: project.payload.id,
                });
                OpenNotification(NotificationType.SUCCESS, "Organization updated!", "");
            })
            .catch((error) => {
                setLoading(false);
                ErrorHandler(error).map((e: any) =>
                    OpenNotification(
                        NotificationType.ERROR,
                        "Failed to update organization",
                        e.message
                    )
                );
            });
    };

    return (
        <>
            <Button
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
                title="Edit Organization"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        onClick={() => form.submit()}
                    >
                        Save Change
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
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: "Please input Date" }]}
                            >
                                <DatePicker allowClear={false} format={dateFormat} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Author">
                                <Input value={users.payload.find((e) => e.id === getUserData().id)?.full_name} readOnly />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Name" name="name"
                                rules={[{ required: true, message: "Please input Name" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Code" name="code"
                                rules={[{ required: true, message: "Please input Code" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item
                                label="Trade"
                                name="specialization"
                                rules={[{ required: true, message: "Please enter specialization" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Location" name="location"
                                rules={[{ required: true, message: "Please enter location" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Website" name="website">
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="col-md-6">
                            <Form.Item label="Email" name="email"
                                rules={[{ required: true, message: "Please input Email" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Phone" name="phone"
                                rules={[{ required: true, message: "Please input Phone" }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Key Contact Person" name="key_contact_person">
                                <AutoComplete
                                    options={contactOptions}
                                    onSelect={handleSelectContact}
                                    placeholder="Select a contact"
                                >
                                    <Input />
                                </AutoComplete>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: "Please select category" }]}
                            >
                                <Select
                                    allowClear
                                    placeholder="Select category"
                                    options={descriptions.map(description => ({
                                        label: description,
                                        value: description,
                                    }))}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    project: state.project.fetchOne,
    users: state.user.fetchAll,
    organizations: state.organization.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOneProject: (action: any) => dispatch(fetchOneProject(action)),
    fetchOrganizations: (action: any) => dispatch(fetchAllOrganization(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrganizationComponent);
