import {call,takeLatest, put} from "redux-saga/effects";
import {GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA} from "../../types/Type";
import {priorityServices} from "../../services/PriorityServices";

function* getAllPrioritySaga(action) {
    try {
        const {data} = yield call(() => priorityServices.getAllPriority())
        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })
    } catch (error) {
        console.log({error})
    }
}

export function* WatcherGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga)
}
