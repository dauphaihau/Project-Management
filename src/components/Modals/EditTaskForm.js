import React, {useEffect, useRef, useState} from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import {useDispatch, useSelector} from "react-redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE_SAGA, GET_TASK_DETAIL_SAGA,
    GET_USER_SAGA,
    HANDLE_CHANGE_POST_API_SAGA,
    REMOVE_TASK_SAGA,
    REMOVE_USER_ASSIGN
} from "../../store/types/Type";
import {Editor} from '@tinymce/tinymce-react';
import reactHtmlParse from 'react-html-parser'
import {Avatar, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {Box, MenuItem, Modal, TextField,} from "@material-ui/core";
import EditTaskComment from "../../pages/Tasks/Layout/Comment/EditTaskComment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {Fade} from '../../HOC/UserModal'
import {useTheme} from "@mui/system";
import {useMediaQuery} from "@mui/material";

let style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
};

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

function EditTaskForm(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {taskDetailModal} = useSelector(state => state.TaskReducer);
    const {arrStatus} = useSelector(state => state.StatusReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);

    const {detailProject} = useSelector(state => state.ProjectReducer)
    const [visibleEditor, setVisibleEditor] = useState(true)
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description)
    const [content, setContent] = useState(taskDetailModal.description)
    const changeRef = useRef(null)

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    if (matches) style = {...style, width: '90%'};

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

    const renderTimeTracking = () => {
        const {timeTrackingRemaining, timeTrackingSpent} = taskDetailModal

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <i className="far fa-clock"/>
            <div style={{width: '100%'}}>
                <div className='progress'>
                    <div className='progress-bar' role='progressbar'
                         style={{width: `${percent}%`, backgroundColor: '#4090f6'}}
                         aria-valuenow={Number(timeTrackingSpent)}
                         aria-valuemin={Number(timeTrackingRemaining)}
                         aria-valuemax={max}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p className='logged'>{Number(timeTrackingSpent)}h logged</p>
                    <p className='estimate-time'>{Number(timeTrackingRemaining)}h remaining</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <TextField
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        color='primary'
                        id="outlined-size-small"
                        variant='outlined'
                        size='small'
                        name="timeTrackingSpent"
                        onChange={handleChange}
                        value={taskDetailModal.timeTrackingSpent}
                    />
                </div>
                <div className='col-6'>
                    <TextField
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        color='primary'
                        id="outlined-size-small"
                        variant='outlined'
                        size='small'
                        name="timeTrackingRemaining"
                        onChange={handleChange}
                        value={taskDetailModal.timeTrackingRemaining}
                    />
                </div>
            </div>
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
            <div style={{textAlign: 'right'}}>
                <DeleteOutlineIcon className='custom-btn-edit-form' style={{
                    marginRight: "45px",
                    color: 'rgb(66,82,110)',
                    width: '30px', height: '30px', marginTop: '-8px', cursor: 'pointer'
                }} onClick={handleOpen}/>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography className='fw-bold'
                                        style={{fontWeight: 'revert'}}
                                        id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to delete this issue?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}
                                        className='my-3'
                                        style={{fontWeight: 'lighter', fontSize: 14}}
                            >
                                Once you delete, it's gone for good.
                            </Typography>
                            <Button color='primary' className='mt-2 mr-2' variant="contained" size='small'
                                    onClick={() => {
                                        dispatch({
                                            type: REMOVE_TASK_SAGA,
                                            taskId: props.taskId,
                                            projectId: props.projectId
                                        })
                                        handleClose()
                                    }}>Delete task
                            </Button>
                            <Button className='mt-2 mr-2' variant="contained" size='small'
                                    style={{backgroundColor: `rgb(235, 236, 240)`}}
                                    onClick={handleClose}>Cancel
                            </Button>
                        </Box>
                    </Fade>
                </Modal>
            </div>
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
                            <TextField fullWidth
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
                        >DESCRIPTION</h6>
                        {renderDescription()}
                    </div>
                    {/*Comment*/}
                    <EditTaskComment taskDetailModal={taskDetailModal} taskId={props.taskId}/>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <TextField fullWidth select variant="outlined"
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
                        <TextField fullWidth select variant="outlined"
                                   color='primary' label='PRIORITY'
                                   name='priorityId'
                                   onChange={handleChange}
                                   value={taskDetailModal.priorityId}
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
                        <TimerIcon/>TIME TRACKING</h6>
                    {renderTimeTracking()}
                    <hr/>
                    <div style={{color: '#929398', fontSize: 13}}>Created at {Math.floor(Math.random() * 24)} hours
                        ago
                    </div>
                    <div style={{color: '#929398', fontSize: 13}}>Updated at {Math.floor(Math.random() * 24)} hours
                        ago
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default EditTaskForm