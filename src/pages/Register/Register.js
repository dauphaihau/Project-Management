import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {Redirect} from "react-router-dom";
import {Box, FormHelperText, TextField} from "@material-ui/core";
import ButtonMui from "@material-ui/core/Button";
import {USER_REGISTER_SAGA} from "../../store/types/Type";

function Register() {

    const dispatch = useDispatch();
    const {messageServer} = useSelector(state => state.UserReducer)

    const formik = useFormik({
        initialValues: {
            email: "",
            passWord: "",
            name: "",
            phoneNumber: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
            passWord: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
            name: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers !'),
            phoneNumber: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(6, 'Phone Number must be at least 6 characters.').max(32, 'Phone Number have max 32 characters'),
        }),
        onSubmit: (values) => {
            dispatch({
                type: USER_REGISTER_SAGA,
                dataRegister: values
            });
        }
    })

    if (localStorage.getItem('accessToken')) {
        return <Redirect to='/'/>
    }

    return (
        <form onSubmit={formik.handleSubmit} className='container' style={{height: window.innerHeight}}>
            <div
                className='d-flex flex-column justify-content-center align-item-center'
                style={{height: window.innerHeight}}
            >
                <h3 className='text-left mt-5'>Create Account</h3>
                <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                    <TextField onChange={formik.handleChange}
                               fullWidth name="email"
                               id="outlined-basic" label="Email"
                               variant="standard"
                    />
                    <FormHelperText required error>{messageServer}</FormHelperText>
                    <FormHelperText required error>
                        {formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null}
                    </FormHelperText>
                </Box>
                <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                    <TextField onChange={formik.handleChange}
                               fullWidth name="passWord"
                               id="standard-basic" label="Password"
                               variant="standard"
                    />
                    <FormHelperText required error>
                        {formik.touched.passWord && formik.errors.passWord ? `${formik.errors.passWord}` : null}
                    </FormHelperText>
                </Box>
                <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                    <TextField onChange={formik.handleChange}
                               fullWidth name="name"
                               id="standard-basic" label="Name"
                               variant="standard"
                    />
                    <FormHelperText required error>
                        {formik.touched.name && formik.errors.name ? `${formik.errors.name}` : null}
                    </FormHelperText>
                </Box>
                <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                    <TextField onChange={formik.handleChange}
                               fullWidth name="phoneNumber"
                               id="standard-basic" label="Phone Number"
                               variant="standard"
                    />
                    <FormHelperText required error>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? `${formik.errors.phoneNumber}` : null}
                    </FormHelperText>
                </Box>
                <div className='form-group text-left '>
                    <ButtonMui
                        fullWidth color='primary'
                        className='mt-3' type='submit'
                        variant="contained"
                    >
                        Register
                    </ButtonMui>
                </div>
                <p className='text-center mt-4 '>have already an account ?<a className='font-weight-bold' href={'/login'}>Login Here</a></p>
            </div>
        </form>
    );
}

export default Register;
