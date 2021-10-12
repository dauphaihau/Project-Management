import {call, takeLatest, put, takeEvery} from "redux-saga/effects";
import {
    DELETE_COMMENT_SAGA,
    GET_ALL_COMMENT,
    GET_ALL_COMMENT_SAGA,
    INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA
} from "../../types/Type";
import {commentServices} from "../../services/CommentServices";

// ----------------- get all Comment
function* getAllCommentSaga(action) {
    try {
        const {data, status} = yield call(() => commentServices.getAllComment(action.id))
        yield put({
            type: GET_ALL_COMMENT,
            dataComment: data
        })
    } catch (error) {
        console.log(error);
    }

}

export function* WatcherGetAllProject() {
    yield takeEvery(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}

// ----------------- insert Comment
function* insertCommentSaga(action) {
    try {
        const {data, status} = yield call(() => commentServices.insertComment(action))
        yield put({
            type: GET_ALL_COMMENT_SAGA
        })
    } catch (error) {
        console.log(error);
    }
}

export function* WatcherInsertComment() {
    yield takeEvery(INSERT_COMMENT_SAGA, insertCommentSaga)
}

// ------------------ update comment
function* updateCommentSaga(action) {
    const {id, content} = action;
    try {
        const {data, status} = yield call(() => commentServices.updateComment(id, content))
        yield put({
            type: GET_ALL_COMMENT_SAGA
        })
    } catch (error) {
        console.log(error);
    }
}

export function* WatcherUpdateComment() {
    yield takeEvery(UPDATE_COMMENT_SAGA, updateCommentSaga)
}


// ------------------ del comment
function* deleteCommentSaga(action) {
    try {
        const {data, status} = yield call(() => commentServices.deleteComment(action.id))
        yield put({
            type: GET_ALL_COMMENT_SAGA
        })
    } catch (error) {
        console.log(error);
    }
}

export function* WatcherDeleteComment() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}
