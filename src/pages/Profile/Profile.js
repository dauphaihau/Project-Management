import React, {useEffect, useState} from 'react';
import {Form, InputNumber, Radio, Input, Button, Checkbox} from 'antd';
import {connect, useDispatch, useSelector} from "react-redux";
import {SET_SUBMIT_CONTENT, EDIT_USER_SAGA} from "../../store/types/Type";
import formik, {useFormik, withFormik} from "formik";
import * as Yup from "yup";


function Profile(props) {

    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch();
    const {userLogin} = useSelector(state => state.UserReducer)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: userLogin.id,
            passWord: userLogin.passWord,
            name: userLogin.name,
            email: userLogin.email,
            phoneNumber: userLogin.phoneNumber,
        },
        validationSchema: Yup.object({
            // id: Yup.string().required('Tài khoản không được bỏ trống').min(6, 'Tài khoản ít nhất phải 6 ký tự').max(32, 'Tài khoản không được quá 32 ký tự'),
            // passWord: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
            // email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
            // name: Yup.string().required('Họ tên không được để trống').matches(/^[A-Z a-z]+$/, 'Tên không được chứa số !'),
            // phoneNumber: Yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]*$/, 'Số điện thoại không được chứa chữ').min(9, 'Số điện thoại ít nhất phải 9 số').max(12, 'Số điện thoại không được quá 12 số'),
        }),
        onSubmit: (newData) => {
            console.log('new-data', newData)
            dispatch({
                type: EDIT_USER_SAGA,
                dataEdited: newData
            })
        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    return (
        <div className='ml-12 sm:ml-12'>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={{size: componentSize}}
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

                <Form.Item label="Id">
                    <Input style={{width: 300}} disabled onChange={formik.handleChange}
                           value={formik.values.id}/>
                </Form.Item>

                <Form.Item label="Mật khẩu">
                    <Input style={{width: 300}} onChange={formik.handleChange} name='passWord'
                           value={formik.values.passWord}/>
                </Form.Item>

                <Form.Item label="Họ tên">
                    <Input name='name' style={{width: 300}} onChange={formik.handleChange}
                           value={formik.values.name}/>
                </Form.Item>

                <Form.Item label="Email" required>
                    <Input style={{width: 300}} name="email" onChange={formik.handleChange}
                           value={formik.values.email}/>

                </Form.Item>

                <Form.Item label="Số điện thoại">
                    <InputNumber style={{width: 300}}
                                 onChange={(value) => {
                                     formik.setFieldValue('phoneNumber', value)
                                 }}
                                 name='phoneNumber' value={formik.values.phoneNumber}/>
                </Form.Item>

                <Form.Item wrapperCol={{
                    span: 1,
                    offset: 4,
                }}>
                    <Button type="primary" htmlType='submit'>Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Profile;
