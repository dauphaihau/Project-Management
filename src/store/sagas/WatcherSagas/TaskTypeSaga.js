import {call, put, takeLatest} from "redux-saga/effects";
import {GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA} from "../../types/Type";
import {taskTypeServices} from "../../services/TaskTypeServices";

function* getAllTaskSaga() {
    try {
        const {data} = yield call(() => taskTypeServices.getAllTask())
        yield put({
            type: GET_ALL_TASK_TYPE,
            arrTaskType: data.content
        })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherGetAllTask() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskSaga)
}
