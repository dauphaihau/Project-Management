import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {CREATE_USER_SAGA, SET_SUBMIT_CONTENT_MODAL} from "../../store/types/Type";
import {withFormik} from "formik";
import * as Yup from "yup";
import {Box, FormHelperText, TextField} from "@material-ui/core";

function CreateUserForm(props) {

    const dispatch = useDispatch();
    const {messageServer} = useSelector(state => state.UserReducer)

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT_MODAL,
            submitFn: handleSubmit
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const {
        touched,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField onChange={handleChange} fullWidth name="email"
                           id="outlined-basic" label="Email" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.email && errors.email ? `${errors.email}` : null}</FormHelperText>
                <FormHelperText required error>{messageServer}</FormHelperText>
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField onChange={handleChange} fullWidth name="passWord"
                           id="outlined-basic" label="Password" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.passWord && errors.passWord ? `${errors.passWord}` : null}</FormHelperText>
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField onChange={handleChange} fullWidth name="name"
                           id="outlined-basic" label="Name" variant="outlined"
                />
                <FormHelperText required error>{touched.name && errors.name ? `${errors.name}` : null}</FormHelperText>
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField onChange={handleChange} fullWidth name="phoneNumber"
                           id="outlined-basic" label="Phone Number" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.phoneNumber && errors.phoneNumber ? `${errors.phoneNumber}` : null}</FormHelperText>
            </Box>
        </form>
    );
}

const CreateUserFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        name: '',
        phoneNumber: '',
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
        passWord: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
        name: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers !'),
        phoneNumber: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(6, 'Phone Number must be at least 6 characters.').max(32, 'Phone Number have max 32 characters'),
    }),
    handleSubmit: (values, {props}) => {

        props.dispatch({
            type: CREATE_USER_SAGA,
            dataRegister: values
        })
    },
    displayName: 'CreateUserForm'
})(CreateUserForm)

export default connect()(CreateUserFormByFormik);
