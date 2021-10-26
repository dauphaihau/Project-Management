import {history, TOKEN_CYBERSOFT} from "../../util/settings";
import {DISPLAY_ALERT, USER_LOGIN_SAGA} from "../types/Type";
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
            history.push('/login');
        } catch (error) {
            console.log({error})
            alert('email already exists')
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