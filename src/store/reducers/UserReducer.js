import {USER_LOGIN} from "../../utils/settings";
import {
    EDIT_USER, ERROR_FROM_SERVER,
    GET_USER,
    GET_USER_BY_PROJECT_ID,
    LOGIN,
} from "../types/Type";

let userLogin = null;

if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: userLogin,
    listUser: [],
    arrUser: [], // use in 'select create task'
    formUserEdit: [
        {
            "id": "string",
            "passWord": "string",
            "email": "string",
            "name": "string",
            "phoneNumber": "string"
        }
    ],
    isAddMember: false,
    messageServer: ''
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {...state, userLogin: action.userLogin};
        }
        case GET_USER: {
            return {...state, listUser: action.listUser}
        }
        case GET_USER_BY_PROJECT_ID: {
            return {...state, arrUser: action.arrUser}
        }
        case EDIT_USER: {
            return {...state, formUserEdit: action.currentDataOfUser}
        }
        case 'CLEAR_FIELD_ADD_MEMBER': {
            return {...state, isAddMember: true}
        }
        case ERROR_FROM_SERVER: {
            return {...state, messageServer: action.messageServer}
        }
        default:
            return {...state}
    }
}