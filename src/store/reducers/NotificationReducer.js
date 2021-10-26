import {DISPLAY_ALERT, HIDE_ALERT} from "../types/Type";

const initialState = {
    isAlert: false,
    message: ''
}

export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_ALERT: {
            return {...state, isAlert: true, message: action.message}
        }

        case HIDE_ALERT: {
            return {...state, isAlert: false}
        }
        default:
            return state
    }
}

