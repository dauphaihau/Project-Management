import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {
    CREATE_TASK_SAGA,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE,
    GET_ALL_TASK_TYPE_SAGA,
    GET_DETAIL_PROJECT_SAGA,
    GET_USER_BY_PROJECT_ID_SAGA,
    GET_USER_SAGA,
    SET_SUBMIT_CONTENT,
    USER_REGISTER_SAGA
} from "../../store/types/Type";
import {withFormik} from "formik";
import * as Yup from "yup";
import {Editor} from '@tinymce/tinymce-react';
import SelectLinhTinh from 'react-select'
import makeAnimated from 'react-select/animated';
import {
    // Slider,
} from 'antd';
import {FormControl, InputLabel, Slider, MenuItem, Select, TextField} from "@material-ui/core";

function CreateTaskForm(props) {

    const animatedComponents = makeAnimated();

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const dispatch = useDispatch();
    const {arrStatus} = useSelector(state => state.StatusReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);
    const {arrUser} = useSelector(state => state.UserReducer);

    console.log('arr-user', arrUser)

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
        setFieldValue('projectId', parseInt(props.projectId))
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

    const handleDropdownChange = (e) => {
        setFieldValue(e.target.name, parseInt(e.target.value));
    }

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            {prepareUserList()}
            <div className="form-group">
                <TextField onChange={handleChange} fullWidth name="taskName"
                           id="outlined-basic" label="Task Name" variant="outlined"
                           helperText={touched.email && errors.email ? `${errors.email}` : null}
                />
            </div>
            <div className='row'>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Assignees</p>
                        <SelectLinhTinh
                            onChange={handleAddUser}
                            name="userAssign"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={options}
                        />
                    </div>

                    <div className="form-group">
                        <TextField fullWidth select variant="outlined"
                                   color='primary'
                                   label='Priority'
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
                    </div>

                    <div className="form-group">
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            color='primary' fullWidth id="outlined-basic" label="ORIGINAL ESTIMATE (HOURS)"
                            variant='outlined'
                            onChange={(e) => {
                                setFieldValue('originalEstimate', e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <TextField fullWidth select variant="outlined"
                                   name='statusId'
                                   color='primary'
                                   label='Status'
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
                    </div>

                    <div className="form-group">
                        <TextField fullWidth select variant="outlined"
                                   color='primary'
                                   label='Task Type'
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
                    </div>

                    <p>Time Tracking</p>
                    <Slider defaultValue={30} color='primary' value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                    />
                    <div className="row">
                        <div className='col-6 text-left'>{timeTracking.timeTrackingSpent}h logged</div>
                        <div className='col-6 text-left'>{timeTracking.timeTrackingRemaining}h remaining</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p className="font-weight-bold">Time Spent</p>
                            <input type='number' defaultValue='0' min='0'
                                   name="timeTrackingSpent" className='form-control'
                                   onChange={(e) => {
                                       setTimeTracking({
                                           ...timeTracking, timeTrackingSpent: e.target.value
                                       })
                                       setFieldValue('timeTrackingSpent', e.target.value);
                                   }}
                            />
                        </div>
                        <div className="col-6">
                            <p className="font-weight-bold">Time Remaining</p>
                            <input type='number' defaultValue='0' min='0'
                                   name="timeTrackingSpent" className='form-control'
                                   onChange={(e) => {
                                       setTimeTracking({
                                           ...timeTracking, timeTrackingRemaining: e.target.value
                                       })
                                       setFieldValue('timeTrackingRemaining', e.target.value);
                                   }}
                            />
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
            projectId: 0
        }
    },
    validationSchema: Yup.object().shape({
        taskName: Yup.string().required('Task name is required'),
        // statusId: Yup.string().required('Status is required'),
        // priorityId: Yup.string().required('Priority is required'),
        // typeId: Yup.string().required('Type is required'),
        // userAssign: Yup.string().required('User assign is required'),
        // originalEstimate: Yup.string().required('Original estimate is required'),
        // timeTrackingSpent: Yup.string().required('Time tracking spent is required'),
        // timeTrackingRemaining: Yup.string().required('Time tracking remains is required'),
        // description: Yup.string().required('Description is required'),
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
    arrStatus: state => state.StatusReducer.arrStatus,
    arrPriority: state => state.PriorityReducer.arrPriority,
    arrTaskType: state => state.TaskTypeReducer.arrTaskType
})

export default connect(mapStateToProps)(CreateTaskFormByFormik);
