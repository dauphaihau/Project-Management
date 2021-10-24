import React, {useEffect, useState} from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL,
    GET_ALL_COMMENT_SAGA,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE_SAGA,
    GET_USER_SAGA,
    HANDLE_CHANGE_POST_API_SAGA,
    INSERT_COMMENT_SAGA, REMOVE_TASK_SAGA,
    REMOVE_USER_ASSIGN
} from "../../store/types/Type";
import {Editor} from '@tinymce/tinymce-react';
import reactHtmlParse from 'react-html-parser'
import {Avatar, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {Box, MenuItem, Modal, TextField,} from "@material-ui/core";
import EditTaskComment from "../Comment/EditTaskComment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useSpring, animated} from "react-spring";
import PropTypes from "prop-types";


const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    // border: '2px solid #000',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
};

const Fade = React.forwardRef(function Fade(props, ref) {
    const {in: open, children, onEnter, onExited, ...other} = props;
    const style = useSpring({
        from: {opacity: 0},
        to: {opacity: open ? 1 : 0},
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

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
    const [visibleEditor, setVisibleEditor] = useState(false)
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description)
    const [content, setContent] = useState(taskDetailModal.description)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: GET_ALL_STATUS_SAGA})
        dispatch({type: GET_ALL_PRIORITY_SAGA,})
        dispatch({type: GET_ALL_TASK_TYPE_SAGA})
        dispatch({
            type: GET_ALL_COMMENT_SAGA,
            idTask: props.taskId
        })
        dispatch({
            type: GET_USER_SAGA,
            idProject: props.projectId
        })

        // setFieldValue('projectId', parseInt(props.projectId))
    }, [])

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
                        onEditorChange={(content, editor) => {
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
                : <div onClick={() => {
                    setHistoryContent(taskDetailModal.description)
                    setVisibleEditor(!visibleEditor)
                }}>
                    {jsxDescription}</div>}
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
                    <div className='progress-bar' role='progressbar' style={{width: `${percent}%`}}
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
                        // label="Time spent"
                        variant='outlined'
                        size='small'
                        name="timeTrackingSpent"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-6'>
                    <TextField
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        color='primary'
                        id="outlined-size-small"
                        // label="Time remaining"
                        variant='outlined'
                        size='small'
                        name="timeTrackingRemaining"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>

    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name, value
        })
    }
    return (
        <form>
            <div style={{textAlign: 'right'}}>
                <DeleteIcon style={{marginRight: "27px", paddingBottom: "7px"}} onClick={handleOpen}/>
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
                <div className='col-8'>
                    <div className="row">
                        <div className="form-group col-4">
                            <TextField
                                fullWidth
                                select
                                variant="standard"
                                color='primary' label={`TASK ${taskDetailModal.taskId} - TYPE: `}
                                onChange={handleChange}
                                defaultValue={taskDetailModal.typeId}
                            >
                                {arrTaskType.map((taskType, index) => {
                                    return <MenuItem key={index} value={taskType.id}>
                                        {taskType.taskType}
                                    </MenuItem>
                                })}
                            </TextField>
                        </div>

                        <div className="form-group col-4">
                            <TextField onChange={handleChange} name="taskName" defaultValue={taskDetailModal.taskName}
                                       id="standard-basic" label="TASK NAME" variant="standard"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <h6 color={`rgba(0, 0, 0, 0.54)`}>DESCRIPTION</h6>
                        {renderDescription()}
                    </div>
                    {/*Comment*/}
                    <EditTaskComment taskId={props.taskId}/>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <TextField fullWidth select variant="outlined"
                                   name='statusId'
                                   color='primary'
                                   label='STATUS'
                                   onChange={handleChange}
                                   defaultValue={taskDetailModal.statusId}
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
                                   onChange={handleChange}
                                   defaultValue={taskDetailModal.priorityId}
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
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                            color='primary' fullWidth id="outlined-basic" label="ORIGINAL ESTIMATE (HOURS)"
                            variant='outlined'
                            name="originalEstimate"
                            onChange={handleChange}
                            defaultValue={taskDetailModal.originalEstimate}
                        />
                    </div>
                    <div className="form-group">
                        <h6 color={`rgba(0, 0, 0, 0.54)`}>ASSIGNEES</h6>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                taskDetailModal.assigness.map((user, index) => {
                                    return <div key={index} style={{
                                        display: 'flex',
                                        marginBottom: 7,
                                        JustifyContent: 'space-evenly'
                                    }} className='item'>
                                        <Avatar size='small' style={{backgroundColor: "#1b55c5"}}>
                                            {user.name[0].toUpperCase()}
                                        </Avatar>
                                        <p className='name ml-1'>
                                            {user.name.slice(0, 8)}
                                            <CloseOutlined style={{marginLeft: 17}} onClick={() => {
                                                dispatch({
                                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                                    actionType: REMOVE_USER_ASSIGN,
                                                    userId: user.id
                                                })
                                            }}/>
                                        </p>
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
                                        }).map((mem, index) => {
                                            return {value: mem.userId, label: mem.name}
                                        })}
                                        optionFilterProp='label' // when select -> occur label
                                        style={{width: '130px'}}
                                        value='+ Add more'
                                        showArrow={false}
                                        onSelect={(value) => {
                                            if (value == '0') {
                                                return;
                                            }
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
                        <TimerIcon/>
                        TIME TRACKING</h6>
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
    );
}

export default EditTaskForm