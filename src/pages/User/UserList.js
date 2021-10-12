import React, {useEffect} from 'react';
import {Table, Space, Button, Form, Input, Tooltip} from 'antd';
import {CloseOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import Modal from "../../HOC/Modal";
import {useDispatch, useSelector} from "react-redux";
import {
    DELETE_USER_SAGA,
    EDIT_USER, GET_USER_BY_KEYWORD, GET_USER_BY_KEYWORD_SAGA,
    GET_USER_SAGA,
    OPEN_DRAWER,
    OPEN_FORM_CREATE_USER,
    OPEN_FORM_EDIT_USER
} from "../../store/types/Type";
import EditUserForm from "../../components/Modals/EditUserForm";
import {Popconfirm, message} from 'antd';
import CreateUserForm from "../../components/Modals/CreateUserForm";
import Search from "antd/es/input/Search";


const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
}

function UserList(props) {

    const dispatch = useDispatch();
    const {listUser} = useSelector(state => state.UserReducer);


    useEffect(() => {
        dispatch({
            type: GET_USER_SAGA
        })
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
            key: 'userId',
            // defaultSortOrder: 'ascend',
            sorter: (a, b) => a.userId - b.userId,
            sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size='small'>
                    <Button type="primary" onClick={() => {
                        // replace key
                        const OLD_KEY = 'userId';
                        const NEW_KEY = 'id';
                        const {[OLD_KEY]: replaceByKey, ...rest} = record
                        const newObj = {
                            ...rest,
                            [NEW_KEY]: replaceByKey
                        }

                        dispatch({
                            type: OPEN_FORM_EDIT_USER,
                            Component: <EditUserForm/>,
                            title: 'Edit user'
                        });
                        dispatch({
                            type: EDIT_USER,
                            currentDataOfUser: newObj
                        })
                    }}
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_USER_SAGA,
                                userId: record.userId
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

    const renderActionButtons = () => {
        return (
            <div class="d-flex justify-content-between align-items-center mb-2">
                <Button
                    type="primary"
                    onClick={() => {
                      dispatch({
                          type: OPEN_FORM_CREATE_USER,
                          Component: <CreateUserForm/>,
                          title: 'Create user'
                      })
                    }}
                >
                    Create User
                </Button>
                <Modal/>
                <Form name="basic" layout="inline">
                    <Search placeholder="input search text" onSearch={(keyWord) => {
                      dispatch({
                          type: GET_USER_SAGA,
                          keyWord: keyWord
                      })
                    }} enterButton />
                    {/*<Form.Item name="searchProject">*/}
                    {/*    <Input placeholder="Search user"/>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item>*/}
                    {/*    <Tooltip title="search">*/}
                    {/*        <Button type="primary" shape="circle" icon={<SearchOutlined/>} size="large"/>*/}
                    {/*    </Tooltip>*/}
                    {/*</Form.Item>*/}
                </Form>
            </div>
        );
    };

    const renderListUser = () => {
        return (
            <Table columns={columns} dataSource={listUser}/>
        )
    }

    return (
        <div>
            {renderActionButtons()}
            {renderListUser()}
        </div>
    );
}

export default UserList;