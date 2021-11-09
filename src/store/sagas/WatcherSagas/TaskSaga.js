import {call, put, select} from "redux-saga/effects";
import {taskServices} from "../../services/TaskServices";
import {takeLatest, takeEvery} from "redux-saga/effects";
import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL, CLOSE_DRAWER,
    CREATE_TASK_SAGA, DISPLAY_ALERT,
    GET_DETAIL_PROJECT_SAGA,
    GET_TASK_DETAIL,
    GET_TASK_DETAIL_SAGA,
    HANDLE_CHANGE_POST_API_SAGA, REMOVE_TASK_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA
} from "../../types/Type";
import {STATUS_CODE} from "../../../utils/settings";

// ---------------------- get task detail
function* getTaskDetailSaga({taskId}) {
    try {
        const {data} = yield call(() => taskServices.getTaskDetail(taskId))
        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherGetTaskDetail() {
    yield takeEvery(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}

// ---------------------- create task
function* createTaskSaga({taskObj}) {
    try {
        yield call(() => taskServices.createTask(taskObj))
        yield put({type: CLOSE_DRAWER})
        yield put({type: DISPLAY_ALERT, message: 'Create task success'})
        yield put({
            type: GET_DETAIL_PROJECT_SAGA,
            projectId: taskObj.projectId
        })
        yield put({type: 'CLEAR_FIELD_CREATE_TASK'})

    } catch (error) {
        console.log({error})
        if (error.response.status === 403) {
            alert('you are not authorized to create tasks')
        } else {
            if (error.response.status === 500) {
                alert('task name already exists, give it another name')
            }
        }
    }
}

export function* WatcherCreateTask() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}


function* removeTaskSaga({taskId, projectId}) {
    try {
        yield call(() => taskServices.removeTask(taskId))
        yield put({
            type: GET_DETAIL_PROJECT_SAGA,
            projectId: projectId
        })
        yield put({type: DISPLAY_ALERT, message: 'Delete task success'})
    } catch (error) {
        if (error.response.status === 403) {
            alert('you are not authorized to delete tasks')
        }
    }
}

export function* WatcherRemoveTask() {
    yield takeLatest(REMOVE_TASK_SAGA, removeTaskSaga)
}


// ------------------------ update status task ( use for drag-drop )
function* updateStatusTaskSaga({taskUpdateStatus}) {

    try {
        const {status} = yield call(() => taskServices.updateStatusTask(taskUpdateStatus))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DETAIL_PROJECT_SAGA,
                projectId: taskUpdateStatus.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }
    } catch (error) {
        console.log({error})
        console.log('error', error.response?.data)
    }
}

export function* WatcherUpdateStatusTask() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga)
}


// ------------------------ handle change post api
export function* handleChangePostApiSaga(action) {

    // invoke action to change taskDetailModal
    // eslint-disable-next-line default-case
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const {name, value} = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            })
        }
            break;

        case CHANGE_ASSIGN: {
            const {userSelected} = action;
            yield put({
                type: CHANGE_ASSIGN,
                userSelected
            })
        }
            break;

        case REMOVE_USER_ASSIGN: {
            const {userId} = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            })
        }
            break;
    }

    // save through API updateTaskSaga
    let {taskDetailModal} = yield select(state => state.TaskReducer);
    console.log('taskDetailModal after change', taskDetailModal)

    // convert data to API's data require
    const listUserAsign = taskDetailModal.assigness?.map((user) => {
        return user.id
    })

    const taskUpdateApi = {...taskDetailModal, listUserAsign}
    console.log('task-update-api', taskUpdateApi)

    try {
        const {status} = yield call(() => taskServices.updateTask(taskUpdateApi))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DETAIL_PROJECT_SAGA,
                projectId: taskUpdateApi.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    } catch (err) {
        console.log({err})
        if (err.response.status === 403) {
            alert('you are not authorized to edit tasks')
        }
    }
}

export function* WatcherHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApiSaga)
}
