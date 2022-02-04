import {
    ADD_USER_SAGA,
    ASSIGN_USER_TASK_SAGA, CLOSE_USER_MODAL, CREATE_USER_SAGA,
    DELETE_USER_FROM_PROJECT_SAGA,
    DELETE_USER_SAGA, DISPLAY_ALERT,
    DISPLAY_LOADING,
    EDIT_USER_SAGA, ERROR_FROM_SERVER,
    GET_ALL_PROJECT_SAGA,
    GET_USER,
    GET_USER_BY_PROJECT_ID,
    GET_USER_BY_PROJECT_ID_SAGA,
    GET_USER_SAGA,
    HIDE_LOADING,
    LOGIN,
    USER_LOGIN_SAGA, USER_REGISTER_SAGA,
} from "../../types/Type";
import {call, takeLatest, put} from 'redux-saga/effects'
import {ACCESS_TOKEN, history, STATUS_CODE, USER_LOGIN} from "../../../utils/settings";
import {userServices} from "../../services/UserServices";


function* LoginSaga({userLogin}) {

    try {
        yield put({type: DISPLAY_LOADING})
        const {data} = yield call(() => userServices.login(userLogin))
        yield put({type: ERROR_FROM_SERVER, messageServer: ''})
        window.location.reload();

        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        yield put({
            type: LOGIN,
            userLogin: data
        })

        yield put({type: HIDE_LOADING})
        yield put({type: DISPLAY_ALERT, message: 'Login successfully'})
    } catch (error) {
        console.log({error})
        if (error.response?.status === STATUS_CODE.NOT_FOUND) {
            yield put({type: ERROR_FROM_SERVER, messageServer: 'Incorrect account or password'})
        }
        yield put({type: HIDE_LOADING})
    }
}

export function* WatcherLogin() {
    yield takeLatest(USER_LOGIN_SAGA, LoginSaga)
}


// ---------------- Register User
function* registerSaga({dataRegister}) {
    try {
        const {data} = yield call(() => userServices.register(dataRegister))
        if (data.statusCode === STATUS_CODE.SUCCESS) {
            yield put({type: DISPLAY_ALERT, message: 'Register successfully'})
            yield put({type: ERROR_FROM_SERVER, messageServer: ''})
            history.push('/login');
        }

    } catch (error) {
        console.log({error});
        if (error.response?.status === STATUS_CODE.NOT_FOUND) {
            yield put({type: ERROR_FROM_SERVER, messageServer: 'email already exists'})
        }
    }
}

export function* WatcherRegister() {
    yield takeLatest(USER_REGISTER_SAGA, registerSaga)
}

// ---------------- get user ( user management )
function* getUserSaga({keyWord}) {
    try {
        const {data} = yield call(() => userServices.getUser(keyWord))
        yield put({
            type: GET_USER,
            listUser: data.content
        })
    } catch (err) {
        console.log({err});
    }
}

export function* WatcherGetUser() {
    yield takeLatest(GET_USER_SAGA, getUserSaga)
}

// ---------------- add user
function* addUserSaga({userProject}) {
    try {
        yield call(() => userServices.addUserProject(userProject))
        yield put({type: GET_ALL_PROJECT_SAGA})
    } catch (error) {
        console.log({error})
        if (error.response.status === 403) {
            alert('you are not authorized to add user')
        } else {
            if (error.response.status === 500) {
                alert('User already exists in the project!')
            }
        }
    }
}

export function* WatcherAddUser() {
    yield takeLatest(ADD_USER_SAGA, addUserSaga)
}


// ---------------- Create User
function* createUserSaga({dataRegister}) {
    try {
        const {data} = yield call(() => userServices.register(dataRegister))
        if (data.statusCode === STATUS_CODE.SUCCESS) {
            yield put({type: GET_USER_SAGA})
            yield put({type: CLOSE_USER_MODAL})
            yield put({type: DISPLAY_ALERT, message: 'Create user successfully'})
            yield put({type: ERROR_FROM_SERVER, messageServer: ''})
        }
    } catch (error) {
        console.log({error});
        if (error.response?.status === STATUS_CODE.NOT_FOUND) {
            yield put({type: ERROR_FROM_SERVER, messageServer: 'email already exists'})
        }
    }
}

export function* WatcherCreateUser() {
    yield takeLatest(CREATE_USER_SAGA, createUserSaga)
}

// ---------------- edit user
function* editUserSaga({dataEdited}) {
    try {
        const {data} = yield call(() => userServices.editUser(dataEdited))
        if (data.statusCode === STATUS_CODE.SUCCESS) {
            yield put({type: GET_USER_SAGA})
            yield put({type: CLOSE_USER_MODAL})
            yield put({type: DISPLAY_ALERT, message: 'Edit info successfully'})
        }
    } catch (err) {
        console.log({err});
    }
}

export function* WatcherEditUser() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}

// ---------------- del user
function* deleteUserSaga(action) {
    try {
        yield call(() => userServices.deleteUser(action.userId))
        yield put({type: GET_USER_SAGA})
        yield put({type: DISPLAY_ALERT, message: 'Delete user successfully'})
    } catch (err) {
        console.log({err});
        yield put({type: DISPLAY_ALERT, message: 'you cannot delete registered users in the project'})
    }
}

export function* WatcherDeleteUser() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}

// ---------------- del user from project
function* deleteUserFromProjectSaga({userProject}) {
    try {
        yield call(() => userServices.deleteUserFromProject(userProject))
        yield put({type: GET_ALL_PROJECT_SAGA})
        yield put({type: DISPLAY_ALERT, message: 'Delete user successfully'})
    } catch (error) {
        console.log({error});
        yield put({type: DISPLAY_ALERT, message: 'you are not authorized to delete user'})
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
        console.log({error})
    }
}

export function* WatcherAssignUserTask() {
    yield takeLatest(ASSIGN_USER_TASK_SAGA, assignUserTaskSaga)
}
