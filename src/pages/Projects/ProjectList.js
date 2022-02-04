import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {Form, Table, Tag, Space, Button} from "antd";
import {Popconfirm} from 'antd';
import {EditOutlined, CloseOutlined} from "@ant-design/icons";

import CreateProjectForm from "../../components/Modals/CreateProjectForm";
import {
    GET_ALL_PROJECT_SAGA,
    OPEN_FORM_CREATE_PROJECT,
    DELETE_PROJECT_SAGA,
    EDIT_PROJECT,
    OPEN_FORM_EDIT_PROJECT,
} from "../../store/types/Type";
import EditProjectForm from "../../components/Modals/EditProjectForm";
import Search from "antd/es/input/Search";
import AvatarGroup from "../../components/AvatarGroup/AvatarGroup";

export default function ProjectList() {

    const dispatch = useDispatch();

    const {listProject} = useSelector(state => state.ProjectReducer);

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    });

    useEffect(() => {
        const {pagination} = state;
        fetch({pagination});
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['ascend', 'descend', 'ascend'],
            defaultSortOrder: 'descend'
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
            render: (text, record) => <NavLink to={`/project/task/${record.id}`}>{text}</NavLink>
            ,
            // width: '25%',
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName.trim().toLowerCase();
                let projectName2 = item2.projectName.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1
                }
                return 1
            }
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
            // width: '15%',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1
                }
                return 1
            }
        },
        {
            title: "Creator",
            key: "creator",
            dataIndex: "creator",
            render: (records) => (
                <span>
                  <Tag color="geekblue">{records.name.toUpperCase()}</Tag>
                </span>
            ),
            // width: '15%',
            sorter: (item2, item1) => {
                let creator1 = item1.creator.name?.trim().toLowerCase();
                let creator2 = item2.creator.name?.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1
                }
                return 1
            }
        },
        {
            title: "Members",
            key: "members",
            dataIndex: "members",
            render: (record, index) => <span><AvatarGroup members={record} projectId={index}/></span>,
            width: '15%',
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button
                        icon={<EditOutlined/>}
                        type="primary" onClick={() => {
                        dispatch({
                            type: OPEN_FORM_EDIT_PROJECT,
                            Component: <EditProjectForm/>,
                            title: 'Edit project'
                        });
                        dispatch({
                            type: EDIT_PROJECT,
                            currentDataOfProject: record
                        })
                    }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                idProject: record.id
                            })
                        }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary" danger
                            onClick={() => {}}
                            icon={<CloseOutlined/>}
                        />
                    </Popconfirm>
                </Space>
            ),
            // width: '20%',
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    const fetch = (params = {}) => {
        setState({
            ...state,
            loading: true,
        });

        dispatch({
            type: GET_ALL_PROJECT_SAGA,
        });
        setState({
            ...state,
            loading: false,
            data: listProject,
            pagination: {
                ...params.pagination,
                total: listProject.length,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };

    const renderActionButtons = () => {
        return (
            <div className="d-flex align-items-center mb-2">
                <Button
                    type="primary"
                    onClick={() => {
                        dispatch({
                            type: OPEN_FORM_CREATE_PROJECT,
                            Component: <CreateProjectForm/>,
                            title: 'Create project'
                        })
                    }}
                >
                    Create Project
                </Button>
                <Form className='ml-2' name="basic" layout="inline">
                    <Search
                        placeholder="Search projects ..."
                        onSearch={(keyWord) => {
                            dispatch({
                                type: GET_ALL_PROJECT_SAGA,
                                keyWord: keyWord
                            })
                        }}
                    />
                </Form>
            </div>
        );
    };

    const renderListProject = () => {
        const {pagination, loading} = state;

        return (
            <div>
                <Table
                    className="project-list"
                    columns={columns}
                    dataSource={listProject}
                    rowKey={(record) => record.id}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        );
    };

    return (
        <div>
            {renderActionButtons()}
            {renderListProject()}
        </div>
    );
}
