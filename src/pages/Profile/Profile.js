import React, {useEffect, useState} from 'react';
import {Form, InputNumber, Radio, Input, Button, Checkbox} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {EDIT_USER_SAGA} from "../../store/types/Type";

const validateMessages = {
    required: '${label} không được bỏ trống',
    types: {
        email: '${label} không hợp lệ!',
        number: '${label} không hợp lệ!',
    },
    number: {
        range: '${label} phải từ 9 - 12 số ',
    },
};

function Profile(props) {

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
        <div className='ml-12 sm:ml-12'>
            <Form
                validateMessages={validateMessages}
                onFinish={onFinish}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
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
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

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
                    sm: {span: 16, offset: 4},
                    lg: {span: 10, offset: 4},
                }}>
                    <Button type="primary" htmlType='submit'>Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Profile;
