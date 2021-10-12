import {call, put} from "redux-saga/effects";
import {takeLatest} from "redux-saga/effects";
import {GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA} from "../../types/Type";
import {priorityServices} from "../../services/PriorityServices";


// ----------- get all priority
function * getAllPrioritySaga(action) {
    try {
        const {data, status} = yield call(() => priorityServices.getAllPriority(action.id))
        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })
    } catch (error) {
        console.log(error);
    }
}

export function * WatcherGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga)
}
