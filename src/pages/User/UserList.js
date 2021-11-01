import React, {useEffect} from 'react';
import {Table, Space, Button, Form} from 'antd';
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    DELETE_USER_SAGA, EDIT_USER, GET_USER_SAGA,
    OPEN_FORM_CREATE_USER,
    OPEN_FORM_EDIT_USER,
} from "../../store/types/Type";
import EditUserForm from "../../components/Modals/EditUserForm";
import {Popconfirm, message} from 'antd';
import CreateUserForm from "../../components/Modals/CreateUserForm";
import Search from "antd/es/input/Search";
import UserModal from "../../HOC/UserModal";

import Avatar from '@mui/material/Avatar';

const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
}

function UserList() {

    const dispatch = useDispatch();
    const {listUser} = useSelector(state => state.UserReducer);

    useEffect(() => {
        dispatch({type: GET_USER_SAGA})
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (a, b) => a.userId - b.userId,
            sortDirections: ['ascend', 'descend', 'ascend'],
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // responsive: ['md'],
            width: '25%',
        },
        {
            title: "Avatar",
            key: "avatar",
            dataIndex: "avatar",
            // responsive: ['lg'],
            render: (text, record) => <Avatar alt="Cindy Baker" src={`https://i.pravatar.cc/150?u=${record.avatar}`}/>,
            width: '10%',
        },

        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            responsive: ['lg'],
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
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
            width: '20%',
        },
    ];

    const renderActionButtons = () => {
        return (
            <div class="d-flex  align-items-center mb-2">
                <Button
                    type="primary"
                    onClick={() => {
                        dispatch({
                            type: OPEN_FORM_CREATE_USER,
                            Component: <CreateUserForm/>,
                            title: 'Create user',
                        })
                    }}
                >
                    Create User
                </Button>
                <UserModal/>
                <Form className='ml-2' name="basic" layout="inline">
                    <Search placeholder="input search text" onSearch={(keyWord) => {
                        dispatch({
                            type: GET_USER_SAGA,
                            keyWord: keyWord
                        })
                    }}/>
                </Form>
            </div>
        );
    };

    const renderListUser = () => {
        return <Table columns={columns} dataSource={listUser} scroll={{x: 300}}/>
    }

    return (
        <div>
            {renderActionButtons()}
            {renderListUser()}
        </div>
    );
}

export default UserList;