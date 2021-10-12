import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {SET_SUBMIT_CONTENT, EDIT_USER_SAGA} from "../../store/types/Type";
import {withFormik} from "formik";
import * as Yup from "yup";


function Profile(props) {

    const { dataExist } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT,
            submitFn: handleSubmit
        })
    },[])

    const {
        touched,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p className='font-weight-bold'>Email</p>
                <input onChange={handleChange} className='form-control' name='email'/>
                {touched.email && errors.email ? (
                    <p className='text-danger'>{errors.email}</p>
                ) : null}
                <p style={{color:'red', marginLeft:'5px'}}>{dataExist}</p>
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Password</p>
                <input onChange={handleChange} className='form-control' name='passWord'/>
                {touched.passWord && errors.passWord ? (
                    <p className='text-danger'>{errors.passWord}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Name</p>
                <input onChange={handleChange} className='form-control' name='name'/>
                {touched.name && errors.name ? (
                    <p className='text-danger'>{errors.name}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Phone</p>
                <input onChange={handleChange} className='form-control' name='phoneNumber'/>
                {touched.phoneNumber && errors.phoneNumber ? (
                    <p className='text-danger'>{errors.phoneNumber}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <button type="submit" className="btn btn-success">Update Profile</button>
            </div>
        </form>
    );
}

const CreateUserFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
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
    handleSubmit: (values, {props, setSubmitting}) => {

        props.dispatch({
            type: EDIT_USER_SAGA,
            dataRegister: values
        })
    },
    displayName: 'CreateUserForm'
})(Profile)

export default connect()(CreateUserFormByFormik);
