import React, {useState} from 'react';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Box, Modal} from "@material-ui/core";
import {Fade} from "../../HOC/UserModal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {REMOVE_TASK_SAGA} from "../../store/types/Type";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
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

const Dialog = (props) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    if (matches) style = {...style, width: '90%'};

    return (
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
                        <Typography
                            className='fw-bold'
                            style={{fontWeight: 'revert'}}
                            id="modal-modal-title" variant="h6" component="h2"
                        >
                            Are you sure you want to delete this issue?
                        </Typography>
                        <Typography
                            id="modal-modal-description" sx={{mt: 2}}
                            className='my-3'
                            style={{fontWeight: 'lighter', fontSize: 14}}
                        >
                            Once you delete, it's gone for good.
                        </Typography>
                        <Button
                            color='primary' className='mt-2 mr-2'
                            variant="contained" size='small'
                            onClick={() => {
                                dispatch({
                                    type: REMOVE_TASK_SAGA,
                                    taskId: props.taskId,
                                    projectId: props.projectId
                                })
                                handleClose()
                            }}>Delete task
                        </Button>
                        <Button
                            className='mt-2 mr-2' variant="contained" size='small'
                            style={{backgroundColor: `rgb(235, 236, 240)`}}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default Dialog;