import React, {useEffect, useRef, useState} from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import {useDispatch, useSelector} from "react-redux";
import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE_SAGA, GET_TASK_DETAIL_SAGA,
    GET_USER_SAGA,
    HANDLE_CHANGE_POST_API_SAGA,
    REMOVE_USER_ASSIGN
} from "../../store/types/Type";
import {Editor} from '@tinymce/tinymce-react';
import reactHtmlParse from 'react-html-parser'
import {Avatar, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {MenuItem, TextField,} from "@material-ui/core";
import EditTaskComment from "../../pages/Tasks/Layout/Comment/EditTaskComment";
import Button from "@material-ui/core/Button";
import Dialog from "../Dialog/Dialog";
import TimeTracking from "../TimeTracking/TimeTracking";

function EditTaskForm(props) {

    const {taskDetailModal} = useSelector(state => state.TaskReducer);
    const {arrStatus} = useSelector(state => state.StatusReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);

    const {detailProject} = useSelector(state => state.ProjectReducer)
    const [visibleEditor, setVisibleEditor] = useState(true)
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description)
    const [content, setContent] = useState(taskDetailModal.description)
    const changeRef = useRef(null)

    console.log('task-detail-modal', taskDetailModal);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: GET_ALL_STATUS_SAGA})
        dispatch({type: GET_ALL_PRIORITY_SAGA,})
        dispatch({type: GET_ALL_TASK_TYPE_SAGA})
        dispatch({
            type: GET_USER_SAGA,
            idProject: props.projectId
        })
        dispatch({
            type: GET_TASK_DETAIL_SAGA,
            taskId: props.taskId
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const renderDescription = () => {
        const jsxDescription = reactHtmlParse(taskDetailModal.description);
        return <div>
            {visibleEditor ? <div>
                    <Editor
                        name='description'
                        initialValue={taskDetailModal.description}
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
                        onEditorChange={(content) => {
                            setContent(content)
                        }}
                    />
                    <Button color='primary' className='mt-2 mr-2' variant="contained"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: CHANGE_TASK_MODAL,
                                    name: 'description',
                                    value: content
                                })
                                setVisibleEditor(false)
                            }}>Save
                    </Button>
                    <Button className='mt-2 mr-2' variant="text"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: CHANGE_TASK_MODAL,
                                    name: 'description',
                                    value: historyContent
                                })
                                setVisibleEditor(false)
                            }}>Close
                    </Button>
                </div>
                : <div style={{height: 350}} onClick={() => {
                    setHistoryContent(taskDetailModal.description)
                    setVisibleEditor(!visibleEditor)
                }}>
                    {jsxDescription}</div>
            }
        </div>
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch({
            type: CHANGE_TASK_MODAL,
            name,
            value
        })

        if (changeRef.current) {
            clearTimeout(changeRef.current)
        }

        changeRef.current = setTimeout(() => {
            console.log('name', name)
            console.log('value', value)

            dispatch({
                type: HANDLE_CHANGE_POST_API_SAGA,
                actionType: CHANGE_TASK_MODAL,
                name, value
            })
        }, 500)
    }

    return <>
        <form>
            <Dialog taskId={props.taskId} projectId={props.projectId}/>
            <div className='row mt-4'>
                <div className='col-md-8'>
                    <div className="row">
                        <div className="form-group col-6 col-sm-4">
                            <TextField
                                fullWidth
                                select name='typeId'
                                variant="standard"
                                color='primary' label={`TASK ${taskDetailModal.taskId} - TYPE: `}
                                onChange={handleChange}
                                value={taskDetailModal.typeId}
                            >
                                {arrTaskType.map((taskType, index) => {
                                    return <MenuItem key={index} value={taskType.id}>
                                        {taskType.taskType}
                                    </MenuItem>
                                })}
                            </TextField>
                        </div>
                        <div className="form-group col-6 col-sm-8">
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                name="taskName"
                                value={taskDetailModal.taskName}
                                id="standard-basic" label="TASK NAME" variant="standard"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <h6
                            color={`rgba(0, 0, 0, 0.54)`}
                            onClick={() => setVisibleEditor(!visibleEditor)}
                        >
                            DESCRIPTION
                        </h6>
                        {renderDescription()}
                    </div>
                    {/*Comment*/}
                    <EditTaskComment taskId={props.taskId}/>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <TextField
                            fullWidth select variant="outlined"
                            name='statusId'
                            color='primary'
                            label='STATUS'
                            onChange={handleChange}
                            value={taskDetailModal.statusId}
                        >
                            {arrStatus.map((status, index) => {
                                return <MenuItem key={index} value={status.statusId}>
                                    {status.statusName}
                                </MenuItem>
                            })}
                        </TextField>
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth select variant="outlined"
                            color='primary' label='PRIORITY'
                            name='priorityId'
                            onChange={handleChange}
                            value={taskDetailModal.priorityId}
                        >
                            {arrPriority.map((priority, index) => (
                                <MenuItem key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="form-group">
                        <TextField
                            color='primary' fullWidth id="outlined-basic" label="ORIGINAL ESTIMATE (HOURS)"
                            variant='outlined'
                            name="originalEstimate"
                            onChange={handleChange}
                            value={taskDetailModal.originalEstimate}
                        />
                    </div>
                    <div className="form-group">
                        <h6 color={`rgba(0, 0, 0, 0.54)`}>ASSIGNEES</h6>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                taskDetailModal.assigness?.map((user, index) => {
                                    return <div key={index}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 7,
                                                    justifyContent: 'space-evenly'
                                                }}
                                                className='item'>
                                        <div className='flex'>
                                            <Avatar size='small' alt="Cindy Baker"
                                                    src={`https://i.pravatar.cc/150?u=${user.avatar}`}/>
                                            <span className='name ml-1'>{user.name.slice(0, 7)}</span>
                                        </div>
                                        <CloseOutlined style={{marginLeft: 7, lineHeight: 'inherit'}} onClick={() => {
                                            dispatch({
                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                actionType: REMOVE_USER_ASSIGN,
                                                userId: user.id
                                            })
                                        }}/>
                                    </div>
                                })
                            }
                            <div style={{display: 'flex', alignItem: 'center'}}>
                                <Select name="lstUser"
                                        options={detailProject.members?.filter(mem => {
                                            let index = taskDetailModal.assigness.findIndex(us => us.id === mem.userId);
                                            if (index !== -1) {
                                                return false;
                                            }
                                            return true;
                                        }).map(mem => {
                                            return {value: mem.userId, label: mem.name}
                                        })}
                                        optionFilterProp='label' // when select -> occur label
                                        style={{width: '130px'}}
                                        value='+ Add more'
                                        showArrow={false}
                                        onSelect={(value) => {
                                            if (value === '0') return;
                                            let userSelected = detailProject.members.find(mem => mem.userId === value);
                                            userSelected = {...userSelected, id: userSelected.userId};
                                            dispatch({
                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                actionType: CHANGE_ASSIGN,
                                                userSelected
                                            })
                                        }}
                                >
                                </Select>
                            </div>
                        </div>
                    </div>

                    <h6 style={{fontSize: '13px', marginBottom: '-10px'}} color={`rgba(0, 0, 0, 0.54)`}>
                        <TimerIcon/>TIME TRACKING
                    </h6>
                    <TimeTracking handleChange={handleChange}/>
                    <hr/>
                    <div style={{color: '#929398', fontSize: 13}}>
                        Created at {Math.floor(Math.random() * 24)} hours ago
                    </div>
                    <div style={{color: '#929398', fontSize: 13}}>
                        Updated at {Math.floor(Math.random() * 24)} hours ago
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default EditTaskForm