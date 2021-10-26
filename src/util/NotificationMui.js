import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {useDispatch, useSelector} from "react-redux";
import {HIDE_ALERT} from "../store/types/Type";
import {SnackbarContent} from "@material-ui/core";


function NotificationMui() {

    const dispatch = useDispatch();
    const {isAlert, message} = useSelector(state => state.NotificationReducer)

    return <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isAlert}
        onClose={() => {
            dispatch({
                type: HIDE_ALERT
            })
        }}
        autoHideDuration={2800}
    >
        <SnackbarContent
            style={{backgroundColor: 'white', color: 'black'}}
            message={message}
        />
    </Snackbar>
}

export default NotificationMui;
