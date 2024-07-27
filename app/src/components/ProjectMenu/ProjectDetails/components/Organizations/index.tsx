import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Button, Popconfirm, Popover, Dropdown, Menu, Checkbox } from "antd";
import { MoreOutlined, DeleteColumnOutlined, SettingOutlined } from "@ant-design/icons";
import { deleteData, OrganizationPropType } from "./util/Organization.util";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { fetchAllOrganization } from "../../../../../redux/Organization/Organization.action";
import { useLocation } from "react-router";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { Organization } from "../../../../../redux/Organization/Organization.type";
import AddOrganizationComponent from './components/AddOrganization/AddOrganization.componet';
import EditOrganizationComponent from './components/EditOrganization/EditOrganization.componet';
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { Link } from "react-router-dom";

const OrganizationComponent: FC<OrganizationPropType> = ({
    organizations,
    fetchOrganizations,
    users,
    category,
    folder,
    sub_folder,
    type,
}) => {
    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
    const [sortedOrganizations, setSortedOrganizations] = useState<Organization[]>([]);
    const location = useLocation();
    const path = location.pathname;
    const project_id = parseInt(path.split("/")[2], 10);

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    useEffect(() => {
        if (organizations.payload) {
            const sorted = organizations.payload.slice().sort((a: any, b: any) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });
            setSortedOrganizations(sorted);
        }
    }, [organizations.payload]);

    useEffect(() => {
        const defaultVisibleColumns = columns.map((col) => col.key);
        setVisibleColumns(defaultVisibleColumns);
    }, []);

    const formatDate = (dateString: string) => {
        if (dateString) {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        }
        return null;
    };

    const Remove = (id: any) => {
        deleteData(id)
            .then(() => {
                fetchOrganizations({
                    project_id,
                });
                OpenNotification(NotificationType.SUCCESS, "Document deleted!", "");
            })
            .catch((error) => {
                ErrorHandler(error).map((e: any) =>
                    OpenNotification(
                        NotificationType.ERROR,
                        "Failed to delete document",
                        e.message
                    )
                );
            });
    };
    // Updated descriptions array to include <strong> for bold text
    const descriptions = [
        "<strong>Appointing party (Project Owner)</strong>",
        "<strong>Lead Appointed party 1 (Design and Engineering firm)</strong>",
        "<strong>Lead Appointed party 2 (Contractor)</strong>",
        "<strong>Appointed party 1</strong>",
        "<strong>Appointed party 2</strong>",
        "<strong>Appointed party 3</strong>",
    ];

    const columns = [
        {
            title: "Description",
            key: "description",
            width: "300px",
            dataIndex: "description",
            render: (text: string) => <div dangerouslySetInnerHTML={{ __html: text }} />
        },
        {
            title: "Date",
            key: "createdAt",
            width: "120px",
            dataIndex: "createdAt",
            render: (createdAt: string) => formatDate(createdAt)
        },
        {
            title: "Author",
            key: "user_id",
            width: "100px",
            dataIndex: "user_id",
            render: (value: any, record: any) => (
                <span>{users.payload.find((e) => e.id === record.user_id)?.full_name}</span>
            ),
        },
        { title: "Name", key: "name", width: "150px", dataIndex: "name" },
        { title: "Code", key: "code", width: "300px", dataIndex: "code" },
        { title: "Trade", key: "specialization", width: "300px", dataIndex: "specialization" },
        { title: "Location", key: "location", width: "300px", dataIndex: "location" },
        { title: "Website", key: "website", width: "300px", dataIndex: "website" },
        { title: "Email", key: "email", width: "300px", dataIndex: "email" },
        { title: "Phone", key: "phone", width: "300px", dataIndex: "phone" },
        {
            title: "Key Contact Person",
            key: "key_contact_person",
            width: "300px",
            dataIndex: "key_contact_person",
            // render: (key_contact_person: string, record: any) => (
            //     <Link to={{
            //         pathname: `/project/${record.project_id}/project-details`,
            //         state: { tab: "3", key_contact_person }
            //     }}>
            //         {key_contact_person}
            //     </Link>
            // ),
        },
        {
            title: "Action",
            align: "center",
            width: "150px",
            key: "action",
            render: (value: any, record: any) => (
                <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                        <div className="d-flex flex-column">
                            <EditOrganizationComponent
                                type={""}
                                category={""}
                                folder={""}
                                sub_folder={""}
                                tab={undefined}
                                id={record.id}
                            />
                            <Popconfirm
                                placement="leftTop"
                                title="Are you sure you want to remove this organization?"
                                onConfirm={() => Remove(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    danger
                                    type="text"
                                    icon={<DeleteColumnOutlined />}
                                >
                                    Delete
                                </Button>
                            </Popconfirm>
                        </div>
                    }
                >
                    <Button
                        icon={<MoreOutlined />}
                        className="btn-outline-secondary border-0"
                    ></Button>
                </Popover>
            ),
        },
    ];

    useEffect(() => {
        setVisibleColumns(columns.map((col) => col.key));
    }, []);

    const handleColumnChange = (checkedValues: any) => {
        setVisibleColumns(checkedValues);
    };

    const columnMenu = (
        <Menu>
            <Checkbox.Group
                style={{ display: "flex", flexDirection: "column" }}
                options={columns.map((col) => ({
                    label: col.title,
                    value: col.key,
                }))}
                value={visibleColumns}
                onChange={handleColumnChange}
            />
        </Menu>
    );

    const flattenedData = sortedOrganizations
        .filter((org) => org.project_id === project_id && descriptions.includes(`<strong>${org.category}</strong>`))
        .map((organization: any) => ({
            ...organization,
            key: organization.id,
            description: `<strong>${organization.category}</strong>`,
        }));

    return (
        <div className="row">
            <div className="col-md-12 mb-2">
                <ReloadButtonComponent
                    onClick={() =>
                        fetchOrganizations({
                            project_id,
                        })
                    }
                />
                <AddOrganizationComponent
                    category={category}
                    folder={folder}
                    sub_folder={sub_folder}
                    type={type}
                    tab={''}
                />
            </div>
            <div className="col-md-12 mb-2">
                <Dropdown overlay={columnMenu} trigger={["click"]}>
                    <Button icon={<SettingOutlined />}>Column Visibility</Button>
                </Dropdown>
            </div>
            <div className="col-md-12">
                <Table
                    columns={columns.filter(col => visibleColumns.includes(col.key))}
                    dataSource={flattenedData}
                    loading={organizations.isPending}
                    scroll={{ x: 10 }}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    organizations: state.organization.fetchAll,
    users: state.user.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrganizations: (action: any) => dispatch(fetchAllOrganization(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
