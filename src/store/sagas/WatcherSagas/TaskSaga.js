import {call, put, select} from "redux-saga/effects";
import {taskServices} from "../../services/TaskServices";
import {takeLatest} from "redux-saga/effects";
import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL, CLOSE_DRAWER,
    CREATE_TASK_SAGA, GET_DETAIL_PROJECT,
    GET_DETAIL_PROJECT_SAGA,
    GET_TASK_DETAIL,
    GET_TASK_DETAIL_SAGA,
    HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA
} from "../../types/Type";
import {history, STATUS_CODE} from "../../../util/settings";

// ---------------------- create task
function* createTaskSaga(action) {

    console.log('action', action)
    try {
        console.log('create task values', action.taskObj);
        const result = yield call(() => taskServices.createTask(action.taskObj))
        // if (status === STATUS_CODE.SUCCESS) {
        //     console.log(data);
        // }

        console.log({result})
        alert('success')
        yield put({type: CLOSE_DRAWER})

        // window.location.href = `/project/task/${action.projectId}`

        // yield put({
        //     type: GET_DETAIL_PROJECT_SAGA,
        //     projectId: action.projectId
        // })

        // history.push(`/project/task/${action.taskObj.projectId}`)

    } catch (error) {
        console.log({error})
        if (error.response.status === 403) {
            // alert(error.response.data.message)
            alert('you are not authorized to create tasks')
        }
    }
}

export function* WatcherCreateTask() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}

// ---------------------- get task detail
function* getTaskDetailSaga(action) {
    const {taskId} = action
    try {
        const {data, status} = yield call(() => taskServices.getTaskDetail(taskId))
        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* WatcherGetTaskDetail() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}

// ------------------------ update status task
function* updateStatusTaskSaga(action) {

    const {taskUpdateStatus} = action
    try {
        const {data, status} = yield call(() => taskServices.updateStatusTask(taskUpdateStatus))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DETAIL_PROJECT,
                projectId: taskUpdateStatus.projectId
            })
        }
    } catch (error) {
        console.log('error', error)
        console.log('error', error.response?.data)
    }
}

export function* WatcherUpdateStatusTask() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga)
}


// ------------------------ handle change post api
export function* handleChangePostApiSaga(action) {
    console.log('action', action)
    // invoke action to change taskDetailModal
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
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id
    })

    taskDetailModal = {...taskDetailModal, listUserAsign: listUserAsign}
    console.log('task-detail-modalll', taskDetailModal)

    try {
        const {status} = yield call(() => taskServices.updateTask(taskDetailModal))

        if (status === STATUS_CODE.SUCCESS) {
            // refresh page
            yield put({
                type: GET_DETAIL_PROJECT_SAGA,
                projectId: taskDetailModal.projectId
            })
            // yield put({
            //     type: GET_TASK_DETAIL_SAGA,
            //     taskId: taskUpdateApi.taskId
            // })
        }
    } catch (e) {
        console.log(e.response?.data)
    }
}

export function* WatcherHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApiSaga)
}
