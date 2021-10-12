import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {EDIT_USER_SAGA, SET_SUBMIT_CONTENT, SET_SUBMIT_EDIT_USER} from "../../store/types/Type";
import {withFormik} from "formik";
import * as yup from 'yup';
import {connect} from "react-redux";
import * as Yup from "yup";

function EditUserForm(props) {

    const dispatch = useDispatch();
    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit')
    // }

    useEffect(() => {
      dispatch({
          type: SET_SUBMIT_CONTENT,
          submitFn: handleSubmit
      })
    },[])

    const {
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
    } = props;
    console.log('props',props);
    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className="form-group">
                <p className='font-weight-bold'>Id</p>
                <input value={values.id} onChange={handleChange} disabled className='form-control' name='id'/>
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Email</p>
                <input value={values.email} onChange={handleChange} className='form-control' name='email'/>
                {touched.email && errors.email ? (
                    <p className='text-danger'>{errors.email}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Password</p>
                <input value={values.passWord} onChange={handleChange} className='form-control' name='passWord'/>
                {touched.passWord && errors.passWord ? (
                    <p className='text-danger'>{errors.passWord}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Name</p>
                <input value={values.name} onChange={handleChange} className='form-control' name='name'/>
                {touched.name && errors.name ? (
                    <p className='text-danger'>{errors.name}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Phone</p>
                <input value={values.phoneNumber} onChange={handleChange} className='form-control' name='phoneNumber'/>
                {touched.phoneNumber && errors.phoneNumber ? (
                    <p className='text-danger'>{errors.phoneNumber}</p>
                ) : null}
            </div>
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
        phoneNumber: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(6, 'Phone Number must be at least 6 characters.').max(32, 'Phone Number have max 32 characters'),
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        console.log('values',values)

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