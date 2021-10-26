import React, {useState} from 'react';
import {Form, InputNumber,  Input, Button} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {EDIT_USER_SAGA} from "../../store/types/Type";

const validateMessages = {
    required: '${label} is required',
    types: {
        email: '${label} should be valid and contain @!',
        number: '${label} must be a number',
    },
    number: {
        range: '${label} must be from 9-12 digits',
    },
};

function Profile() {

    const [componentSize, setComponentSize] = useState('default');
    const {userLogin} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    console.log('user-login', userLogin)

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const onFinish = (newData) => {
        console.log('Received values of form: ', newData);
        dispatch({
            type: EDIT_USER_SAGA,
            dataEdited: newData
        })
    };

    return (
        <Form
            validateMessages={validateMessages}
            onFinish={onFinish}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            layout="horizontal"
            initialValues={{
                size: componentSize,
                id: userLogin.id,
                passWord: userLogin.passWord,
                name: userLogin.name,
                email: userLogin.email,
                phoneNumber: userLogin.phoneNumber,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}

        >
            <Form.Item label="Id" name='id'>
                <Input style={{width: 300}} disabled/>
            </Form.Item>

            <Form.Item label="Password" name={['passWord']} rules={[{required: true}]}>
                <Input style={{width: 300}}/>
            </Form.Item>

            <Form.Item label="Name" name={['name']} rules={[{required: true}]}>
                <Input style={{width: 300}}/>
            </Form.Item>

            <Form.Item label="Email" required name={['email']} rules={[{required: true, type: 'email'}]}>
                <Input style={{width: 300}}/>
            </Form.Item>

            <Form.Item label="Phone Number" name={['phoneNumber']}
                       rules={[{required: true, type: 'number', min: 100000000, max: 999999999999}]}>
                <InputNumber style={{width: 300}}/>
            </Form.Item>

            <Form.Item wrapperCol={{
                xs: {span: 24, offset: 0},
                sm: {span: 16, offset: 8},
            }}>
                <Button type="primary" htmlType='submit'>Update</Button>
            </Form.Item>
        </Form>
    );
}

export default Profile;
