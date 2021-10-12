import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    UPDATE_PROJECT_SAGA,
    SET_SUBMIT_CONTENT,
    GET_PROJECT_CATEGORY_SAGA
} from "../../store/types/Type";
import {withFormik} from "formik";
import * as yup from 'yup';
import {connect} from "react-redux";
import * as Yup from "yup";
import {Editor} from "@tinymce/tinymce-react";

function EditProjectForm(props) {

    const {projectCategory} = useSelector(state => state.ProjectReducer)
    const dispatch = useDispatch();

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        // console.log(editorRef.current.getContent());
        }
    }

    const {
        values,
        touched,
        errors,
        handleChange,
        handleSubmit, setFieldValue
    } = props;
    // console.log('vvvv', values)

    useEffect(() => {
        setFieldValue('description', values.description)

        dispatch({ // call API load project category
            type: GET_PROJECT_CATEGORY_SAGA
        })

        dispatch({
            type: SET_SUBMIT_CONTENT,
            submitFn: handleSubmit
        })
    }, [])


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
        // console.log(props)
    }

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-4 col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Id</p>
                        <input disabled value={values.id} className='form-control' name='id'/>
                    </div>
                </div>
                <div className='col-md-4 col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Name</p>
                        <input value={values.projectName} onChange={handleChange} className='form-control'
                               name='projectName'/>
                        {touched.projectName && errors.projectName ? (
                            <p className='text-danger'>{errors.projectName}</p>
                        ) : null}
                    </div>
                </div>
                <div className='col-md-4 col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Category</p>
                        {/*<input type="text" value={values.categoryId} name='categoryId'/>*/}
                        <select name='categoryId' value={values.categoryId} className='form-control' >
                            {projectCategory?.map((item, index) => {
                                return <option value={item.id} key={index}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={values.description}
                            name='description'
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

const EditProjectFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        const {formProjectEdit} = props;
        console.log('props', props);
        return {
            id: formProjectEdit.id,
            projectName: formProjectEdit.projectName,
            description: formProjectEdit.description,
            categoryId: formProjectEdit.categoryId
        }

    },
    validationSchema: yup.object().shape({
        projectName: Yup.string().required('Project name is required'),
        description: Yup.string().required('Description is required'),
        categoryId: Yup.string().required('Category is required')
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        console.log('values', values)

        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            dataEdited: values
        })
    },
    displayName: 'EditProjectForm'
})(EditProjectForm)

const mapStateToProps = state => ({
    formProjectEdit: state.ProjectReducer.formProjectEdit
})

export default connect(mapStateToProps)(EditProjectFormByFormik);