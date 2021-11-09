import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EDIT_USER_SAGA, LOGIN} from "../../store/types/Type";
import {Box, FormHelperText, TextField} from "@material-ui/core";
import ButtonMui from "@material-ui/core/Button";
import {useFormik} from "formik";
import * as Yup from "yup";

function Profile() {

    const {userLogin} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            id: userLogin.id,
            email: userLogin.email,
            passWord: userLogin.passWord,
            name: userLogin.name,
            phoneNumber: userLogin.phoneNumber,
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
            passWord: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
            name: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers !'),
            phoneNumber: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(10, 'Phone Number must be at least 10 characters.').max(12, 'Phone Number have max 12 characters'),
        }),
        onSubmit: (newData) => {
            dispatch({
                type: EDIT_USER_SAGA,
                dataEdited: newData
            })
            dispatch({type: LOGIN, userLogin: newData})
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className='container' style={{height: window.innerHeight}}>
            <div className='d-flex flex-column justify-content-center align-item-center'>
                <h3 className='text-left mt-5'>Profile</h3>
                <Box sx={{mb: 2, minWidth: 120}} error>
                    <TextField style={{width: 300}} defaultValue={formik.values.email} onChange={formik.handleChange}
                               name="email"
                               id="outlined-basic" label="Email" variant="standard"
                    />
                    <FormHelperText required
                                    error>{formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null}</FormHelperText>
                </Box>
                <Box sx={{mb: 2, minWidth: 120}} error>
                    <TextField style={{width: 300}} defaultValue={formik.values.passWord} onChange={formik.handleChange}
                               name="passWord"
                               id="standard-basic" label="Password" variant="standard"
                    />
                    <FormHelperText required
                                    error>{formik.touched.passWord && formik.errors.passWord ? `${formik.errors.passWord}` : null}</FormHelperText>
                </Box>
                <Box sx={{mb: 2, minWidth: 120}} error>
                    <TextField style={{width: 300}} defaultValue={formik.values.name} onChange={formik.handleChange}
                               name="name"
                               id="standard-basic" label="Name" variant="standard"
                    />
                    <FormHelperText required
                                    error>{formik.touched.name && formik.errors.name ? `${formik.errors.name}` : null}</FormHelperText>
                </Box>
                <Box sx={{mb: 2, minWidth: 120}} error>
                    <TextField style={{width: 300}} defaultValue={formik.values.phoneNumber}
                               onChange={formik.handleChange} name="phoneNumber"
                               id="standard-basic" label="Phone Number" variant="standard"
                    />
                    <FormHelperText required
                                    error>{formik.touched.phoneNumber && formik.errors.phoneNumber ? `${formik.errors.phoneNumber}` : null}</FormHelperText>
                </Box>
                <div className='form-group text-left '>
                    <ButtonMui color='primary' className='mt-3' type='submit'
                               variant="contained">Update</ButtonMui>
                </div>
            </div>
        </form>
    );
}

export default Profile;
