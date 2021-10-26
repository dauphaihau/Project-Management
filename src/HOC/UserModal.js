import React from 'react';
import {Box, Modal} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {CLOSE_USER_MODAL} from "../store/types/Type";
import {animated, useSpring} from "react-spring";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
};

export const Fade = React.forwardRef(function Fade(props, ref) {
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

function UserModal() {

    const {visible, title, Component, handleSubmit} = useSelector(state => state.ModalReducer);
    const dispatch = useDispatch();


    return (
        <div>
            <Modal
                open={visible}
                onClose={() => {
                    dispatch({type: CLOSE_USER_MODAL})
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={visible}>
                    <Box sx={style}>
                        <Typography
                            style={{fontWeight: 'revert', marginBottom: 5}}
                            id="modal-modal-title"
                            variant="h6" component="h2">{title}
                        </Typography>
                        {Component}
                        <Button color='primary' className='mt-2 mr-2' variant="contained" size='small'
                                onClick={handleSubmit}>Submit
                        </Button>
                        <Button className='mt-2 mr-2' type='submit' variant="contained" size='small'
                                style={{backgroundColor: `rgb(235, 236, 240)`}}
                                onClick={() => {
                                    dispatch({type: CLOSE_USER_MODAL})
                                }}>Cancel
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default UserModal;