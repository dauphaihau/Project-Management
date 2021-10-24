import {
    ADD_USER_SAGA,
    ASSIGN_USER,
    ASSIGN_USER_SAGA,
    ASSIGN_USER_TASK_SAGA, CLOSE_DRAWER,
    DELETE_USER_FROM_PROJECT_SAGA,
    DELETE_USER_SAGA,
    DISPLAY_LOADING,
    EDIT_USER_SAGA,
    GET_ALL_PROJECT_SAGA,
    GET_USER, GET_USER_BY_KEYWORD, GET_USER_BY_KEYWORD_SAGA,
    GET_USER_BY_PROJECT_ID,
    GET_USER_BY_PROJECT_ID_SAGA,
    GET_USER_SAGA,
    GET_USER_SEARCH,
    HIDE_LOADING,
    LOGIN,
    USER_LOGIN_SAGA, USER_REGISTER_SAGA
} from "../../types/Type";
import {call, takeLatest, put, delay} from 'redux-saga/effects'
import {ACCESS_TOKEN, EMAIL_EXIST, history, STATUS_CODE, TOKEN_CYBERSOFT, USER_LOGIN} from "../../../util/settings";
import {userServices} from "../../services/UserServices";
import {notifiFuntion} from "../../../util/Notification";


// ---------------- user login
function* registerSaga(action) {

    try {
        yield put({
            type: DISPLAY_LOADING
        })

        yield delay(500)
        const {data, status} = yield call(() => userServices.register(action.dataRegister))
        console.log('data', data)

        if (data.statusCode === STATUS_CODE.SUCCESS) {
            yield put({
                type: CLOSE_DRAWER
            })
            notifiFuntion('success', 'register successfully')
        }
        yield put({
            type: HIDE_LOADING
        })

    } catch (error) {
        console.log(error);
        yield put({
            type: EMAIL_EXIST,
            data: error.response.data.message
        })
        yield put({
            type: HIDE_LOADING
        })

    }
}

export function* WatcherRegister() {
    yield takeLatest(USER_REGISTER_SAGA, registerSaga)
}

function* LoginSaga(action) {
    let {userLogin} = action;

    try {
        yield put({
            type: DISPLAY_LOADING
        })

        yield delay(1000)


        const {data, status} = yield call(() => userServices.login(userLogin))


        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        yield put({
            type: LOGIN,
            userLogin: data
        })
        // console.log(data);
        history.push('/projects')
        notifiFuntion('success', 'login successfully')

        yield put({
            type: HIDE_LOADING
        })

    } catch (error) {
        console.log({error})
        if (error.response.status === 400) {
            alert('Tài khoản hoặc mật khẩu không đúng')
        }
        yield put({
            type: HIDE_LOADING
        })
    }
}

export function* WatcherLogin() {
    yield takeLatest(USER_LOGIN_SAGA, LoginSaga)
}

// ---------------- get user ( user management )
function* getUserSaga(action) {

    let {keyWord} = action
    try {
        const {data, status} = yield call(() => userServices.getUser(keyWord))
        yield put({
            type: GET_USER,
            listUser: data.content
        })

    } catch (err) {
        console.log(err);
    }
}

export function* WatcherGetUser() {
    yield takeLatest(GET_USER_SAGA, getUserSaga)
}

// ---------------- add user
function* addUserSaga(action) {

    console.log('action', action)
    try {
        yield call(() => userServices.addUserProject(action.userProject))
        yield put({
            type: GET_ALL_PROJECT_SAGA
        })
    } catch (error) {
        console.log('error', error.statusCode)
        if (error.statusCode === 403) {
            alert('User is unthorization!')
        }
        alert('User already exists in the project!')
    }
}

export function* WatcherAddUser() {
    yield takeLatest(ADD_USER_SAGA, addUserSaga)
}

// ---------------- edit user
function* editUserSaga(action) {
    try {
        yield put({
            type: DISPLAY_LOADING
        })

        yield delay(600)
        const {data, status} = yield call(() => userServices.editUser(action.dataEdited))
        yield put({
            type: GET_USER_SAGA
        })
        if (data.statusCode === STATUS_CODE.SUCCESS) {
            yield put({
                type: CLOSE_DRAWER
            })
        }
        notifiFuntion('success', 'Edit successfully')

        yield put({
            type: HIDE_LOADING
        })
    } catch (err) {
        console.log(err);
    }
}

export function* WatcherEditUser() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}

// ---------------- del user
function* deleteUserSaga(action) {
    try {
        yield call(() => userServices.deleteUser(action.userId))
        yield put({
            type: GET_USER_SAGA
        })
        notifiFuntion('success', 'Delete user successfully')
    } catch (err) {
        console.log(err);
        notifiFuntion('error', 'you cannot delete registered users in the project')
    }
}

export function* WatcherDeleteUser() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}

// ---------------- del user from project
function* deleteUserFromProjectSaga(action) {

    console.log(action)
    try {
        yield call(() => userServices.deleteUserFromProject(action.userProject))
        yield put({
            type: GET_ALL_PROJECT_SAGA
        })
    } catch (error) {
        console.log(error);
    }
}

export function* WatcherDeleteUserFromProject() {
    yield takeLatest(DELETE_USER_FROM_PROJECT_SAGA, deleteUserFromProjectSaga)
}

// ---------------- get user by project id ( users in project )
function* getUserByProjectIdSaga({projectId}) {
    try {
        const {data, status} = yield call(() => userServices.getUserByProjectId(projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: data.content
            })
        }
    } catch (error) {
        console.log({error});
        console.log(error.response?.data)
        if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }
}

export function* WatcherGetUserByProjectId() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}

// ---------------- assign user task
function* assignUserTaskSaga(action) {

    try {
        yield call(() => userServices.assignUserTask(action))
    } catch (error) {
        console.log(error.response?.data)
    }
}

export function* WatcherAssignUserTask() {
    yield takeLatest(ASSIGN_USER_TASK_SAGA, assignUserTaskSaga)
}
