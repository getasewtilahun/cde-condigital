import { FC, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Table, Button, Dropdown, Menu, Checkbox } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProjectInformationPropType } from "./util/ProjectInformation.util";
import { useLocation } from "react-router";
import { Project } from "../../../../../redux/Project/Project.type";
import { fetchAllProject } from "../../../../../redux/Project/Project.action";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";

const ProjectInformationComponent: FC<ProjectInformationPropType> = ({
    projects,
    fetchProjects,
    users,
    tab,
    category,
    folder,
    sub_folder,
    type,
}) => {
    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

    const location = useLocation();
    const path = location.pathname;
    const project_id = parseInt(path.split("/")[2], 10);

    const [sortedProjects, setSortedProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (projects.payload) {
            console.log("Projects before sorting:", projects.payload);
            const sorted = projects.payload.slice().sort((a: Project, b: Project) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });
            console.log("Projects after sorting:", sorted);
            setSortedProjects(sorted);
        }
    }, [projects.payload]);

    // Only initialize visibleColumns once
    useEffect(() => {
        const defaultVisibleColumns = columns.map((col) => col.key);
        setVisibleColumns(defaultVisibleColumns);
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    const columns = [
        {
            title: "Date", key: "createdAt", width: "120px", dataIndex: "createdAt", render: (date: string) => formatDate(date),
        },
        {
            title: "Author", key: "user_id", width: "100px", dataIndex: "user_id",
            render: (value: any, record: any) => (
                <span>{users.payload.find((e) => e.id === record.user_id)?.full_name}</span>
            ),
        },
        { title: "Name", key: "name", width: "150px", dataIndex: "name" },
        { title: "Code", key: "code", width: "300px", dataIndex: "code" },
        { title: "Project Type", key: "project_type", width: "100px", dataIndex: "project_type" },

        { title: "Contract Type", key: "contract_type", width: "150px", dataIndex: "contract_type" },
        { title: "Delivery Method", key: "delivery_method", width: "100px", dataIndex: "delivery_method" },
        { title: "Address", key: "address", width: "100px", dataIndex: "address" },
        { title: "Site Area", key: "site_area", width: "100px", dataIndex: "site_area" },
        { title: "Type Of Asset", key: "type_of_asset", width: "100px", dataIndex: "type_of_asset" },
        { title: "Estimated Cost(In ETB))", key: "project_budget", width: "100px", dataIndex: "project_budget" },
        { title: "Basement Size(G-)", key: "basement_size", width: "100px", dataIndex: "basement_size" },
        { title: "Floor Size(G+)", key: "floor_size", width: "100px", dataIndex: "floor_size" },
        { title: "Road Size(KM)", key: "road_size", width: "100px", dataIndex: "road_size" },
        { title: "Estimated Duration (In Month)", key: "estimated_duration", width: "100px", dataIndex: "estimated_duration" },
        { title: "Start Date", key: "start_date", width: "100px", dataIndex: "start_date", render: (date: string) => formatDate(date), },
        { title: "End Date", key: "end_date", width: "100px", dataIndex: "end_date", render: (date: string) => formatDate(date), },
    ];

    const handleColumnChange = useCallback((checkedValues: any) => {
        setVisibleColumns(checkedValues);
    }, []);

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

    const filteredColumns = columns.filter((col) =>
        visibleColumns.includes(col.key)
    );

    return (
        <div className="row">
            <div className="col-md-12 mb-2">
                <ReloadButtonComponent
                    onClick={() =>
                        fetchProjects({})
                    }
                />
            </div>
            <div className="col-md-12 mb-2">
                <Dropdown overlay={columnMenu} trigger={["click"]}>
                    <Button icon={<SettingOutlined />}>Column Visibility</Button>
                </Dropdown>
            </div>
            <div className="col-md-12">
                <Table
                    columns={filteredColumns}
                    loading={projects.isPending}
                    dataSource={sortedProjects.map((project: any, index: number) => ({
                        ...project,
                        key: index + 1,
                    }))}
                    scroll={{ x: 10 }}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: state.project.fetchAll,
    users: state.user.fetchAll,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchProjects: (action: any) => dispatch(fetchAllProject(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInformationComponent);
