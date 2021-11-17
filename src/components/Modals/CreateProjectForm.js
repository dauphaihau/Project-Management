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
import {FormControl, FormHelperText, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    textField: {
        [theme.breakpoints.down('md')]: {
            marginTop: 20
        }
    }
}));

function CreateProjectForm(props) {
    const editorRef = useRef(null);
    const {projectCategory} = useSelector(state => state.ProjectReducer)
    const dispatch = useDispatch();
    const classess = useStyle()

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT,
            submitFn: handleSubmit
        })
        dispatch({
            type: GET_PROJECT_CATEGORY_SAGA
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const {
        touched,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditorChange = (content) => {
        setFieldValue('description', content)
    }

    return (
        <form className='container' onSubmit={handleSubmit}>
            <FormControl className={classess.textField} fullWidth sx={{m: 1, minWidth: 120}} error>
                <TextField onChange={handleChange} fullWidth name="projectName"
                           id="outlined-error-helper-text"
                           label="Project Name" variant="outlined"
                />
                <FormHelperText
                    error>{touched.projectName && errors.projectName ? `${errors.projectName}` : null}</FormHelperText>
            </FormControl>

            <div className='form-group'>
                <p className='font-monospace mt-3'>Description</p>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    style={{borderRadius: 6}}
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
                <FormHelperText
                    error>{touched.description && errors.description ? `${errors.description}` : null}</FormHelperText>
            </div>


            <FormControl fullWidth sx={{m: 1, minWidth: 120}} error>
                <TextField select variant="outlined" color='primary' name='categoryId' label='Category'
                           defaultValue={1}
                           onChange={(e) => {
                               setFieldValue('categoryId', e.target.value)
                           }}
                >
                    {projectCategory.map((item, index) => {

                        return <MenuItem key={index} value={item.id}>
                            {item.projectCategoryName}
                        </MenuItem>
                    })}
                </TextField>
            </FormControl>
        </form>
    );
}

const CreateProjectFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: '',
        }
    },
    validationSchema: Yup.object().shape({
        projectName: Yup.string().required('Project name is required'),
        description: Yup.string().required('Description is required'),
    }),
    handleSubmit: (values, {props }) => {
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
