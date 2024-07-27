import React, { FC, useState, useEffect, useMemo } from 'react';
import { Modal, Button, Table } from 'antd';
import { AllActionStatusPropType } from '../../util/RequestForInformation.util';
import { connect } from 'react-redux';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { fetchAllRequestForInformationstatus } from '../../../../../../../redux/RequestForInformationStatus/RequestForInformationStatus.action';
import { fetchAllUser } from '../../../../../../../redux/User/User.action';
import { useLocation } from 'react-router-dom';
import { DownloadFile } from '../../../../../../Document/MyDocument/index.util';

const AllActionStatusComponent: FC<AllActionStatusPropType> = ({
    request_for_information_status,
    request_for_information_statuses = [],
    fetchAllRequestForInformationStatus,
    RequestID,
    users,
    project,
    fetchUsers,
    tab,
    document,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const location = useLocation();
    const project_id = parseInt(location.pathname.split("/")[2]);

    useEffect(() => {
        if (project && project.payload) {
            fetchUsers();
            fetchAllRequestForInformationStatus({ project_id: project.payload.id });
        }
    }, [fetchUsers, fetchAllRequestForInformationStatus, project, tab]);

    const showModal = () => setIsModalVisible(true);
    const handleOk = () => setIsModalVisible(false);
    const handleCancel = () => setIsModalVisible(false);

    console.log("RequestID", RequestID);
    console.log("request_for_information_statuses", request_for_information_statuses);

    // Filter and sort the request_for_information_statuseses
    const filteredAndSortedStatuses = useMemo(() => {
        if (Array.isArray(request_for_information_statuses)) {
            return request_for_information_statuses
                .filter((status: any) => status.request_for_information_id === RequestID)
                .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        return [];
    }, [request_for_information_statuses, RequestID]);

    const columns = [
        {
            title: 'Actioner',
            dataIndex: 'from',
            key: 'from',
            render: (value: any, record: any) => (
                <span>
                    {users.payload.find((e) => e.id === record.from)?.full_name}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: "File",
            key: "file",
            width: "100px",
            render: (value: any, record: any) => (
                <div className="d-flex">
                    {document ? (
                        <>
                            <Button
                                type="link"
                                icon={<DownloadOutlined />}
                                className="mr-2"
                                onClick={() => DownloadFile(
                                    document,
                                    ``
                                )}
                            ></Button>
                        </>
                    ) : null}
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
        <div>
            {/* <Button type="link" icon={<EyeOutlined />} onClick={showModal} /> */}
            <Button type="link" onClick={showModal}>
                All status
            </Button>

            <Modal
                title="Actions Table"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
                bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }} // Ensure modal content can scroll

            >
                <Table
                    dataSource={filteredAndSortedStatuses}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    scroll={{ y: 300 }} // Set vertical scroll height after 6 rows

                />
            </Modal>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    request_for_information_status: state.request_for_information_status.fetchAll || [],
    users: state.user.fetchAll || [],
    project: state.project.fetchOne || {},
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUsers: () => dispatch(fetchAllUser()),
    fetchAllRequestForInformationStatus: (action: any) => dispatch(fetchAllRequestForInformationstatus(action)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllActionStatusComponent);
