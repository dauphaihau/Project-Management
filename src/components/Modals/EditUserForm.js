import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {
    EDIT_USER_SAGA,
    SET_SUBMIT_CONTENT_MODAL,
} from "../../store/types/Type";
import {withFormik} from "formik";
import * as yup from 'yup';
import {connect} from "react-redux";
import * as Yup from "yup";
import {Box, FormHelperText, TextField} from "@material-ui/core";

function EditUserForm(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT_MODAL,
            submitFn: handleSubmit
        })
    }, [])

    const {
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField defaultValue={values.id} disabled onChange={handleChange} fullWidth
                           name="id" id="outlined-basic" label="Id" variant="outlined"
                />
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField defaultValue={values.email} onChange={handleChange} fullWidth name="email"
                           id="outlined-basic" label="Email" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.email && errors.email ? `${errors.email}` : null}</FormHelperText>
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField defaultValue={values.passWord} onChange={handleChange} fullWidth name="passWord"
                           id="outlined-basic" label="PASSWORD" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.passWord && errors.passWord ? `${errors.passWord}` : null}</FormHelperText>
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField defaultValue={values.name} onChange={handleChange} fullWidth name="name"
                           id="outlined-basic" label="Name" variant="outlined"
                />
                <FormHelperText required error>{touched.name && errors.name ? `${errors.name}` : null}</FormHelperText>
            </Box>
            <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                <TextField defaultValue={values.phoneNumber} onChange={handleChange} fullWidth name="phoneNumber"
                           id="outlined-basic" label="Phone Number" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.phoneNumber && errors.phoneNumber ? `${errors.phoneNumber}` : null}</FormHelperText>
            </Box>
        </form>
    );
}

const EditUserFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {formUserEdit} = props;
        return {
            id: formUserEdit.id,
            passWord: formUserEdit.passWord,
            email: formUserEdit.email,
            name: formUserEdit.name,
            phoneNumber: formUserEdit.phoneNumber
        }

    },
    validationSchema: yup.object().shape({
        email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
        passWord: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
        name: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers !'),
        phoneNumber: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(10, 'Phone Number must be at least 10 characters.').max(12, 'Phone Number have max 12 characters'),
    }),
    handleSubmit: (values, {props}) => {
        console.log('values', values)

        props.dispatch({
            type: EDIT_USER_SAGA,
            dataEdited: values
        })
    },
    displayName: 'EditUserForm'
})(EditUserForm)

const mapStateToProps = state => ({
    formUserEdit: state.UserReducer.formUserEdit
})

export default connect(mapStateToProps)(EditUserFormByFormik);