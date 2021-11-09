import {history, STATUS_CODE, TOKEN_CYBERSOFT} from "../../utils/settings";
import {DISPLAY_ALERT, ERROR_FROM_SERVER, USER_LOGIN_SAGA} from "../types/Type";
import axios from "axios";

export const registerAction = dataUser => {
    return async dispatch => {
        try {
            await axios({
                url: 'http://jiranew.cybersoft.edu.vn/api/Users/signup',
                method: 'POST',
                data: dataUser,
                headers: {
                    'TokenCyberSoft': TOKEN_CYBERSOFT
                }
            })
            dispatch({type: DISPLAY_ALERT, message: 'Register successfully'})
            dispatch({type: ERROR_FROM_SERVER, messageServer: ''})
            history.push('/login');
        } catch (error) {
            console.log({error})
            if (error.response?.status === STATUS_CODE.NOT_FOUND) {
                dispatch({type: ERROR_FROM_SERVER, messageServer: 'email already exists'})
            }
        }
    };
}

export const loginActions = (email, password) => {
    return {
        type: USER_LOGIN_SAGA,
        userLogin: {
            email: email,
            password: password
        }
    };
}