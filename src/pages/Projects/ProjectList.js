import React, {useState, useEffect, Fragment, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Table, Tag, Space, Avatar, Tooltip, Button, Popover} from "antd";
import {
    EditOutlined,
    CloseOutlined,
    UserAddOutlined
} from "@ant-design/icons";
import Modal from "../../HOC/Modal";
import CreateProjectForm from "../../components/Modals/CreateProjectForm";
import {
    GET_ALL_PROJECT_SAGA,
    OPEN_FORM_CREATE_PROJECT,
    DELETE_PROJECT_SAGA,

    EDIT_PROJECT,
    OPEN_FORM_EDIT_PROJECT,
    ADD_USER_SAGA,
    DELETE_USER_FROM_PROJECT_SAGA,
    GET_USER_SAGA,
} from "../../store/types/Type";
import DeleteIcon from '@mui/icons-material/Delete';
import {Popconfirm, message} from 'antd';
import EditProjectForm from "../../components/Modals/EditProjectForm";
import {AutoComplete} from "antd/es";
import Search from "antd/es/input/Search";
import {NavLink} from "react-router-dom";

export default function ProjectList() {
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }

    const dispatch = useDispatch();
    const {listProject} = useSelector((state) => state.ProjectReducer);
    const {listUser} = useSelector((state) => state.UserReducer);

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    });

    const [valueLabel, setValueLabel] = useState('')

    useEffect(() => {
        const {pagination} = state;
        fetch({pagination});
    }, []);

    const searchRef = useRef(null)

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],
            // width: '5%',
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
            render: (record, index) => <span>{renderAvatarGroups(record, index)}</span>,
            // width: '15%',
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" onClick={() => {
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
                <Modal/>
                <Form className='ml-2' name="basic" layout="inline">
                    <Search placeholder="input search text" onSearch={(keyWord) => {
                        dispatch({
                            type: GET_ALL_PROJECT_SAGA,
                            keyWord: keyWord
                        })
                    }}/>
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
                        color: "#4091f7",
                        backgroundColor: "#cfe4fd",

                    }}
                >
                    {members.map((member, index) => {
                        return (
                            <Popover key={index} placement='top'
                                     content={() => {
                                         return <table className='table table-borderless table-light'>
                                             <thead>
                                             <tr>
                                                 <th scope="col">Id</th>
                                                 <th scope="col">Avatar</th>
                                                 <th scope="col">Name</th>
                                                 <th scope="col">Action</th>
                                             </tr>
                                             </thead>
                                             <tbody>
                                             {members.map((item, index) => {
                                                 return <tr scope='row' key={index}>
                                                     <td>{item.userId}</td>
                                                     <td>
                                                         <img alt='avatar' className="img-fluid img-responsive rounded-circle mr-2"
                                                              src={`https://i.pravatar.cc/150?u=${item.avatar}`}
                                                              width="38"/>
                                                     </td>
                                                     <td>{item.name}</td>
                                                     <td>
                                                         <DeleteIcon
                                                             style={{cursor: "pointer", marginLeft: 8}}
                                                             onClick={() => {
                                                                 dispatch({
                                                                     type: DELETE_USER_FROM_PROJECT_SAGA,
                                                                     userProject: {
                                                                         "projectId": projectId.id,
                                                                         "userId": item.userId
                                                                     }
                                                                 })
                                                             }}
                                                         />
                                                     </td>
                                                 </tr>
                                             })}
                                             </tbody>
                                         </table>
                                     }}>
                                <Tooltip
                                    key={index} placement="top">
                                    <Avatar style={{backgroundColor: "#3a87f7",}}>
                                        {member.name[0]?.toUpperCase()}
                                    </Avatar>
                                </Tooltip>
                            </Popover>
                        );
                    })}
                </Avatar.Group>

                <Popover placement="top" title={'Add user'} trigger="click" content={() => {
                    return <AutoComplete
                        style={{width: '100%'}}
                        options={listUser?.map((user) => {
                            return {label: user.name, value: user.userId.toString()}
                        })}
                        value={valueLabel} // set default value

                        onChange={(text) => {
                            setValueLabel(text)
                        }}
                        onSelect={(valueSelect, option) => {
                            setValueLabel(option.label)
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
                    <Button shape="circle"  icon={<UserAddOutlined/>}/>
                </Popover>
            </Fragment>
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
