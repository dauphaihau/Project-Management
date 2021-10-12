import React, {useState, useEffect, Fragment, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Input, Table, Tag, Space, Avatar, Tooltip, Button, Popover} from "antd";
import {
    SearchOutlined,
    EditOutlined,
    CloseOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import ProjectForm from "../../components/Modals/ProjectForm";
import Modal from "../../HOC/Modal";
import CreateProjectForm from "../../components/Modals/CreateProjectForm";
import {
    GET_ALL_PROJECT_SAGA,
    OPEN_FORM_CREATE_PROJECT,
    DELETE_PROJECT_SAGA,
    EDIT_PROJECT,
    OPEN_DRAWER,
    OPEN_FORM_EDIT_PROJECT,
    GET_USER_BY_KEYWORD,
    GET_USER_BY_KEYWORD_SAGA,
    ADD_USER_SAGA,
    DELETE_USER_FROM_PROJECT_SAGA,
    GET_USER_SAGA, GET_ALL_PROJECT
} from "../../store/types/Type";
import {Popconfirm, message} from 'antd';
import EditProjectForm from "../../components/Modals/EditProjectForm";
import {AutoComplete} from "antd/es";
import {UserReducer} from "../../store/reducers/UserReducer";
import Search from "antd/es/input/Search";
import axios from "axios";
import {ACCESS_TOKEN, history, TOKEN_CYBERSOFT} from "../../util/settings";

export default function ProjectList(props) {
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }

    const {listProject} = useSelector((state) => state.ProjectReducer);
    const {listUser} = useSelector((state) => state.UserReducer);

    console.log('list-project', listProject)

    const dispatch = useDispatch();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    });
    const [valueLable, setValueLable] = useState('')

    const searchRef = useRef(null)

    const handleProjectDelete = (projectId) => {
    };

    const handleProjectUpdate = (projectId) => {
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            // render: (record) => <a href="#">{record}</a>,
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
            render: (text, record) => (
                <a href={"/project/task/" + record.id}>{text}</a>
            ),
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Creator",
            key: "creator",
            dataIndex: "creator",
            render: (records) => (
                <span>
                  <Tag color="green">{records.name.toUpperCase()}</Tag>
                </span>
            ),
        },
        {
            title: "Members",
            key: "members",
            dataIndex: "members",
            render: (record, index) => <span>{renderAvatarGroups(record, index)}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="small">
                    {/* <a href={'/project/detail/' + record.id}>Edit</a>
                      <a href={'/project/delete/' + record.id}>Delete</a> */}
                    {/* <Button type="primary" onClick={handleProjectUpdate(record.id)} icon={<EditOutlined />}/> */}
                    <Button type="primary" onClick={() => {
                        console.log('record', record)
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
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            console.log('record', record);
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                idProject: record.id
                            })
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger onClick={() => {
                        }} icon={<CloseOutlined/>}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const {pagination} = state;
        fetch({pagination});
    }, []);

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

    const openForm = () => {
        dispatch({
            type: "OPEN_PROJECT",
            Component: <ProjectForm/>,
            handleSubmit: () => {
                alert("Logged in");
            },
        });
    };

    const renderActionButtons = () => {
        return (
            <div class="d-flex justify-content-between align-items-center mb-2">
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
                <Modal/>
                <Form name="basic" layout="inline">
                    <Search placeholder="input search text" onSearch={(keyWord) => {
                        dispatch({
                            type: GET_ALL_PROJECT_SAGA,
                            keyWord: keyWord
                        })
                    }} enterButton/>
                    {/*<Form.Item name="searchProject">*/}
                    {/*    <Input placeholder="Search project"/>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item>*/}
                    {/*    <Tooltip title="search">*/}
                    {/*        <Button*/}
                    {/*            type="primary"*/}
                    {/*            shape="circle"*/}
                    {/*            icon={<SearchOutlined/>}*/}
                    {/*            size="large"*/}
                    {/*        />*/}
                    {/*    </Tooltip>*/}
                    {/*</Form.Item>*/}
                </Form>
            </div>
        );
    };

    const renderAvatarGroups = (members = [], projectId) => {

        return (
            <Fragment>
                <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                    }}
                >
                    {members.map((member, index) => {
                        return (
                            <Popover className={{borderRadius: '6px'}} key={index} placement='top' title='members'
                                     content={() => {
                                         return <table className='table'>
                                             <thead>
                                             <tr>
                                                 <th>id</th>
                                                 <th>Avatar</th>
                                                 <th>Name</th>
                                                 <th/>
                                             </tr>
                                             </thead>
                                             <tbody>
                                             {members.map((item, index) => {
                                                 return <tr key={index}>
                                                     <td>{item.id}</td>
                                                     <td><img src={item.avatar} height={25} width={25} alt='...'/></td>
                                                     <td>{item.name}</td>
                                                     <td>
                                                         <button
                                                             onClick={() => {
                                                                 dispatch({
                                                                     type: DELETE_USER_FROM_PROJECT_SAGA,
                                                                     userProject: {
                                                                         "projectId": projectId.id,
                                                                         "userId": item.userId
                                                                     }
                                                                 })
                                                             }}
                                                             className='btn btn-danger'>Delete
                                                         </button>
                                                     </td>
                                                 </tr>
                                             })}
                                             </tbody>
                                         </table>
                                     }}>
                                <Tooltip
                                    // title={member.name}
                                    key={index} placement="top">
                                    <Avatar style={{backgroundColor: "#f56a00",}}>
                                        {member.name[0].toUpperCase()}
                                    </Avatar>
                                </Tooltip>

                            </Popover>
                        );
                    })}
                </Avatar.Group>
                <Popover placement="top" title={'Add user'} trigger="click" content={() => {
                    return <AutoComplete
                        style={{width: '100%'}}
                        options={listUser?.map((user, index) => {
                            return {label: user.name, value: user.userId.toString()}
                        })}
                        value={valueLable} // set default value

                        onChange={(text) => {
                            setValueLable(text)
                        }}
                        onSelect={(valueSelect, option) => {

                            // console.log('option', option)
                            // console.log('valueSelect', valueSelect)
                            setValueLable(option.label)
                            dispatch({
                                type: ADD_USER_SAGA,
                                userProject: {
                                    "projectId": projectId.id, // record.id
                                    "userId": valueSelect
                                }
                            })

                        }}
                        onSearch={(value) => {

                            // Debounce for search input
                            if (searchRef.current) {
                                clearTimeout(searchRef.current)
                            }

                            searchRef.current = setTimeout(() => {
                                dispatch({
                                    type: GET_USER_SAGA,
                                    keyWord: value
                                })
                            }, 300)
                        }}/>
                }}>
                    <Button shape="circle" icon={<PlusOutlined/>}/>
                </Popover>
            </Fragment>
        );
    };

    const renderlistProject = () => {
        const {data, pagination, loading} = state;

        return (
            <div>
                <Table
                    className="project-list"
                    columns={columns}
                    dataSource={listProject}
                    // rowKey={(record) => record.login.uuid}
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
            {renderlistProject()}
        </div>
    );
}
