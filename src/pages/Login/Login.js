import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {withFormik} from 'formik';
import LockIcon from '@mui/icons-material/Lock';
import * as yup from 'yup';
import {connect, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Box, FormHelperText, TextField} from "@material-ui/core";
import ButtonMui from "@material-ui/core/Button";
import * as Yup from "yup";
import {USER_LOGIN_SAGA} from "../../store/types/Type";

function Login(props) {

    const {messageServer} = useSelector(state => state.UserReducer)

    if (localStorage.getItem('accessToken')) {
        return <Redirect to='/'/>
    }

    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{height: window.innerHeight}}>
            <div className='d-flex flex-column justify-content-center align-item-center'
                 style={{height: window.innerHeight}}>
                <h1 className='text-center'>Login</h1>
                <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 1}}>
                    <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField onBlur={handleBlur} onChange={handleChange} fullWidth name="email"
                               id="outlined-basic" placeholder="Email" variant="standard"
                    />
                </Box>
                <FormHelperText required style={{marginLeft: 30}}
                                error>{touched.email && errors.email ? `${errors.email}` : null}</FormHelperText>
                <FormHelperText required style={{marginLeft: 30}} error>{messageServer}</FormHelperText>
                <Box fullWidth sx={{display: 'flex', alignItems: 'flex-end', minWidth: 120}} error>
                    <LockIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField onBlur={handleBlur} onChange={handleChange} fullWidth name="password"
                               id="standard-basic" placeholder="Password" variant="standard"
                    />
                </Box>
                <FormHelperText required style={{marginLeft: 30, marginBottom: 30}}
                                error>{touched.password && errors.password ? `${errors.password}` : null}</FormHelperText>
                <ButtonMui fullWidth color='primary' type='submit' variant="contained">Login</ButtonMui>

                <p className='text-center mt-3'>Don’t have an account? <a className='font-weight-bold'
                                                                          href={'/register'}>Create Account</a></p>
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
        email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
    }),
    handleSubmit: ({email, password}, {props, setSubmitted}) => {
        let userLogin = {
            email: email,
            password: password
        }

        props.dispatch({type: USER_LOGIN_SAGA, userLogin});
    }, displayName: 'Login to continuous',

})(Login);

export default connect()(LoginWithFormik)