import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {
    CREATE_TASK_SAGA,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE_SAGA,
    GET_USER_BY_PROJECT_ID_SAGA,
    SET_SUBMIT_CONTENT,
} from "../../store/types/Type";
import {withFormik} from "formik";
import * as Yup from "yup";
import {Editor} from '@tinymce/tinymce-react';
import SelectReact from 'react-select'
import makeAnimated from 'react-select/animated';
import {Slider, MenuItem, TextField, Box, FormHelperText} from "@material-ui/core";

function CreateTaskForm(props) {

    const animatedComponents = makeAnimated();

    const editorRef = useRef(null);

    const dispatch = useDispatch();
    const {arrStatus} = useSelector(state => state.StatusReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);
    const {arrUser} = useSelector(state => state.UserReducer);

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT,
            submitFn: handleSubmit
        })
        dispatch({
            type: GET_ALL_STATUS_SAGA
        })
        dispatch({
            type: GET_ALL_PRIORITY_SAGA,
            id: 0
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_USER_BY_PROJECT_ID_SAGA,
            projectId: props.projectId
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
        setFieldValue('description', content)
    }

    const handleAddUser = (selectedOptions) => {
        const selectedUsers = [];
        for (let option of selectedOptions) {
            selectedUsers.push(parseInt(option.value));
        }
        setFieldValue('listUserAsign', selectedUsers)
    }

    const options = []
    const prepareUserList = () => {
        arrUser?.map((user) => {
            options.push({
                value: user.userId,
                label: user.name
            })
        });
    }

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            {prepareUserList()}
            <Box fullWidth sx={{mb: 2, mt:2, minWidth: 120}} error>
                <TextField onChange={handleChange} fullWidth name="taskName"
                           id="outlined-basic" label="TASK NAME" variant="outlined"
                />
                <FormHelperText required
                                error>{touched.taskName && errors.taskName ? `${errors.taskName}` : null}</FormHelperText>
            </Box>
            <div className='row'>
                <div className="col-md-6">
                    <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                        <TextField fullWidth select variant="outlined"
                                   color='primary' label='PRIORITY' name='priorityId'
                                   defaultValue={1}
                                   onChange={(e) => {
                                       setFieldValue('priorityId', e.target.value)
                                   }}
                        >
                            {arrPriority.map((priority, index) => {
                                return <MenuItem key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </MenuItem>
                            })}
                        </TextField>
                    </Box>

                    <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                        <TextField fullWidth select variant="outlined"
                                   name='statusId'
                                   color='primary'
                                   label='Status'
                                   defaultValue={1}
                                   onChange={(e) => {
                                       setFieldValue('statusId', e.target.value)
                                   }}
                        >
                            {arrStatus.map((status, index) => {
                                return <MenuItem key={index} value={status.statusId}>
                                    {status.statusName}
                                </MenuItem>
                            })}
                        </TextField>
                    </Box>

                    <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                        <TextField fullWidth select variant="outlined"
                                   name='typeId'
                                   color='primary'
                                   label='TASK TYPE'
                                   defaultValue={1}
                                   onChange={(e) => {
                                       setFieldValue('typeId', e.target.value)
                                   }}
                        >
                            {arrTaskType.map((taskType, index) => {
                                return <MenuItem key={index} value={taskType.id}>
                                    {taskType.taskType}
                                </MenuItem>
                            })}
                        </TextField>
                    </Box>



                </div>
                <div className="col-md-6">
                    <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                        <SelectReact
                            styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                            menuPortalTarget={document.body}
                            placeholder={<div>ASSIGNEES</div>}
                            onChange={handleAddUser}
                            name="userAssign"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={options}
                        />
                    </Box>

                    <Box fullWidth sx={{mb: 2, minWidth: 120}} error>
                        <TextField
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                            color='primary' fullWidth id="outlined-basic" label="ORIGINAL ESTIMATE (HOURS)"
                            variant='outlined'
                            onChange={(e) => {
                                setFieldValue('originalEstimate', e.target.value)
                            }}
                        />
                        <FormHelperText required error>{touched.originalEstimate && errors.originalEstimate ? `${errors.originalEstimate}` : null}</FormHelperText>
                    </Box>

                    <h6 color={`rgba(0, 0, 0, 0.54)`}>Time Tracking</h6>
                    <Slider defaultValue={30} color='primary' value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                    />
                    <div className="row">
                        <div className='col-6 text-left'>{timeTracking.timeTrackingSpent}h logged</div>
                        <div className='col-6 text-left'>{timeTracking.timeTrackingRemaining}h remaining</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {/*<p className="font-weight-bold">Time Spent</p>*/}
                            {/*<TextField onChange={handleChange} fullWidth name="taskName"*/}
                            {/*           id="outlined-basic" label="TASK NAME" variant="outlined"*/}
                            {/*/>*/}
                            <TextField type='number' placeholder='Time Spent'  min='0'
                                   name="timeTrackingSpent" className='form-control'
                                   onChange={(e) => {
                                       setTimeTracking({
                                           ...timeTracking, timeTrackingSpent: e.target.value
                                       })
                                       setFieldValue('timeTrackingSpent', e.target.value);
                                   }}
                            />
                            <FormHelperText required error>{touched.timeTrackingSpent && errors.timeTrackingSpent ? `${errors.timeTrackingSpent}` : null}</FormHelperText>
                        </div>
                        <div className="col-6">
                            <TextField type='number' placeholder='Time Remaining'  min='0'
                                   name="timeTrackingSpent" className='form-control'
                                   onChange={(e) => {
                                       setTimeTracking({
                                           ...timeTracking, timeTrackingRemaining: e.target.value
                                       })
                                       setFieldValue('timeTrackingRemaining', e.target.value);
                                   }}
                            />
                            <FormHelperText required error>{touched.timeTrackingRemaining && errors.timeTrackingRemaining ? `${errors.timeTrackingRemaining}` : null}</FormHelperText>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p className="font-weight-bold">Description</p>
                <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </form>
    );
}

const CreateTaskFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {arrStatus, arrPriority, arrTaskType} = props
        return {
            taskName: '',
            statusId: arrStatus[0]?.statusId,
            priorityId: arrPriority[0]?.priorityId,
            typeId: arrTaskType[0]?.id,
            listUserAsign: [],
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            description: '',
            projectId: props.projectId
        }
    },
    validationSchema: Yup.object().shape({
        taskName: Yup.string().required('Task name is required'),
        timeTrackingRemaining: Yup.string().required('Time tracking remaining is required').matches(/^[0-9]*$/, 'Time tracking remaining must be a number'),
        timeTrackingSpent: Yup.string().required('Time tracking spent Number is required').matches(/^[0-9]*$/, 'Time tracking spent must be a number'),
        originalEstimate: Yup.string().required('Original estimate is required').matches(/^[0-9]*$/, 'Original estimate must be a number'),
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        console.log('values', values)
        props.dispatch({
            type: CREATE_TASK_SAGA,
            taskObj: values,
        })
    },
    displayName: 'CreateTaskForm'
})(CreateTaskForm)

const mapStateToProps = state => ({
    arrStatus: state.StatusReducer.arrStatus,
    arrPriority: state.PriorityReducer.arrPriority,
    arrTaskType: state.TaskTypeReducer.arrTaskType
})

export default connect(mapStateToProps)(CreateTaskFormByFormik);
