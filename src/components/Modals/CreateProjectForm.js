import React, {useEffect, useRef} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {
    CREATE_PROJECT_SAGA,
    GET_PROJECT_CATEGORY_SAGA,
    SET_SUBMIT_CONTENT
} from "../../store/types/Type";
import {withFormik} from "formik";
import * as Yup from "yup";
import {Editor} from '@tinymce/tinymce-react';
import {ProjectReducer} from "../../store/reducers/ProjectReducer";

function CreateProjectForm(props) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }
    const {projectCategory} = useSelector(state => state.ProjectReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT,
            submitFn: handleSubmit
        })
    }, [])

    useEffect(() => {
        dispatch({
            type: GET_PROJECT_CATEGORY_SAGA
        })
    }, [])

    const {
        touched,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditorChange = (content, editor) => {
        setFieldValue('description',content)
        // console.log(props)
    }

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p className='font-weight-bold'>Project Name</p>
                <input onChange={handleChange} className='form-control' name='projectName'/>
                {touched.projectName && errors.projectName ? (
                    <p className='text-danger'>{errors.projectName}</p>
                ) : null}
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Description</p>
                {/*<input className='form-control' name='description'/>*/}
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
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
            <div className='form-group'>
                <select name='categoryId' className='form-control' onChange={handleChange}>
                    {projectCategory.map((item, index) => {
                        return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                    })}
                </select>
            </div>
        </form>
    );
}

const CreateProjectFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log('props', props)
        return {
            projectName: '',
            description: '',
            categoryId: props.projectCategory[0]?.id,
        }
    },
    validationSchema: Yup.object().shape({
        projectName: Yup.string().required('Project name is required'),
        description: Yup.string().required('Description is required'),
        // category: Yup.string().required('Category is required')
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        console.log('props', values)

        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },
    displayName: 'CreateProjectForm'
})(CreateProjectForm)

const mapStateToProps = (state) => ({
    projectCategory: state.ProjectReducer.projectCategory
})

export default connect(mapStateToProps)(CreateProjectFormByFormik);
