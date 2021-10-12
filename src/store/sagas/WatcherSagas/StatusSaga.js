import {call, put} from "redux-saga/effects";
import {takeLatest} from "redux-saga/effects";
import {
    GET_ALL_STATUS,
    GET_ALL_STATUS_SAGA,
} from "../../types/Type";
import {statusServices} from "../../services/StatusServices";

function* getAllStatusSaga() {
    console.log('get all stats');
    try {
        const {data, status} = yield call(() => statusServices.getAllStatus())
        console.log('status',data);
        yield put({
            type: GET_ALL_STATUS,
            arrStatus: data.content
        })
    } catch (error) {
        console.log('error',error);
        console.log(error.response?.data);
    }
}

export function* WatcherGetAllStatus() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}

