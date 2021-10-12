import {EMAIL_EXIST, history, TOKEN_CYBERSOFT} from "../../util/settings";
import {USER_LOGIN_SAGA} from "../types/Type";
import axios from "axios";


export const registerAction = (dataUser) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: 'http://jiranew.cybersoft.edu.vn/api/Users/signup',
                method: 'POST',
                data: dataUser,
                headers: {
                    'TokenCyberSoft': TOKEN_CYBERSOFT
                }
            })
            alert('register successful')
            history.push('/login');

        } catch (error) {
            console.log(error.response);
            alert(error.response.data.message)
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