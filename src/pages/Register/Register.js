import React from 'react';
import { useFormik } from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {registerAction} from "../../store/actions/UserAction";
import {Redirect} from "react-router-dom";


function Register(props) {

  const dispatch = useDispatch();
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

      const action = registerAction(values)
      dispatch(action);
    }
  })

  if (localStorage.getItem('accessToken')) {
    return <Redirect to='/'/>
  }

  return (
      <form onSubmit={formik.handleSubmit} className=' container d-flex justify-content-center align-content-center'>
        <div className='w-100 text-left'>
          <h3 className='text-left mt-5'>Create Account</h3>
          <div className='form-group mt-4'>
            <p>Email</p>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' name='email' />
            {formik.touched.email && formik.errors.email ? (
                <p className='text-danger'>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <p>Password</p>
            <input onChange={formik.handleChange} type="text" className='form-control' name='passWord' />
            {formik.touched.passWord && formik.errors.passWord ? (
                <p className='text-danger'>{formik.errors.passWord}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <p>Name</p>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' name='name' />
            {formik.touched.name && formik.errors.name ? (
                <p className='text-danger'>{formik.errors.name}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <p>Phone</p>
            <input onChange={formik.handleChange} type="text" className='form-control' name='phoneNumber' />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <p className='text-danger'>{formik.errors.phoneNumber}</p>
            ) : null}
          </div>
          <div className='form-group text-left '>
            <button className='btn btn-success mt-3 w-100' type='submit'>Register</button>
          </div>
          <p className='text-center mt-4 '>have already an account ? <a className='font-weight-bold' href={'/login'} >Login Here</a></p>
        </div>
      </form>
  );
}

export default Register;
