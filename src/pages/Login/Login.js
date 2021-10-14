import React from 'react';
import {Button, Input} from "antd";
import {UserOutlined,GoogleOutlined, LockOutlined, TwitterOutlined , createFromIconfontCN} from '@ant-design/icons';
import {withFormik} from "formik";
import * as yup from 'yup';
import {connect} from "react-redux";
import {loginActions} from "../../store/actions/UserAction";
import {Redirect} from "react-router-dom";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

function Login(props) {

    if (localStorage.getItem('accessToken')) {
        // alert('you are logged in')
        return <Redirect to='/'/>
    }

    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{height: window.innerHeight}}>
            <div className='d-flex flex-column justify-content-center align-item-center'
                 style={{height: window.innerHeight}}>
                <h1 className='text-center'>Login</h1>
                <h3 className='text-center'>{props.displayName}</h3>

                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} onBlur={handleBlur} name='email' size="large" placeholder="email"
                           prefix={<UserOutlined/>}/>
                </div>
                {touched.email && errors.email ? (
                    <p className='text-danger'>{errors.email}</p>
                ) : null}
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} onBlur={handleBlur} name='password' size="large" type='password'
                           placeholder="password"
                           prefix={<LockOutlined/>}/>
                </div>
                {touched.password && errors.password ? (
                    <p className='text-danger'>{errors.password}</p>
                ) : null}

                <Button className='mt-3' size='large' htmlType='submit' type='primary'>Login</Button>

                <div className='social mt-4 my-3 text-center'>
                    <Button style={{backgroundColor: '#42609A', marginLeft: '44', color:'#fff'}} shape="circle" icon={<IconFont type="icon-facebook"/>} size={"large"}/>
                    <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined/>} size={"large"}/>
                    <Button style={{backgroundColor: 'rgb(216, 78, 63)', color: '#fff'}} type=" ml-3" shape="circle" icon={<GoogleOutlined />} size={"large"}/>
                </div>
                <p className='text-center mt-3'>Don’t have an account? <a className='font-weight-bold' href={'/register'}>Create Account</a></p>
            </div>
        </form>
    );
}


const LoginWithFormik = withFormik({

    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    validationSchema: yup.object().shape({
        email: yup.string().required('Please enter your email!').email('email is invalid'),
        password: yup.string().min(6, 'Password must be at least 6 characters.').max(32, 'password have max 32 characters')
    }),
    handleSubmit: ({email, password}, {props, setSubmitted}) => {
        props.dispatch(loginActions(email, password));
    }, displayName: 'Login to continuous',

})(Login);

export default connect()(LoginWithFormik)