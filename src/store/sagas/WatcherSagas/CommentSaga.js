import {call, takeLatest, put, takeEvery} from "redux-saga/effects";
import {
    CLEAR_FIELD_COMMENT,
    DELETE_COMMENT_SAGA,
    GET_ALL_COMMENT,
    GET_ALL_COMMENT_SAGA, GET_TASK_DETAIL_SAGA,
    INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA
} from "../../types/Type";
import {commentServices} from "../../services/CommentServices";

// ----------------- get all Comment
function* getAllCommentSaga({idTask}) {
    try {
        const {data} = yield call(() => commentServices.getAllComment(idTask))
        console.log('data', data)
        yield put({
            type: GET_ALL_COMMENT,
            lstComment: data.content
        })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherGetAllComment() {
    yield takeEvery(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}

// ----------------- insert Comment
function* insertCommentSaga({infoComment}) {
    try {
        yield call(() => commentServices.insertComment(infoComment))
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: infoComment.taskId
        })
        yield put({type: CLEAR_FIELD_COMMENT})
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherInsertComment() {
    yield takeEvery(INSERT_COMMENT_SAGA, insertCommentSaga)
}

// ------------------ update comment
function* updateCommentSaga({commentId, taskId, contentComment}) {
    try {
        yield call(() => commentServices.updateComment(commentId, contentComment))
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskId
        })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherUpdateComment() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga)
}


// ------------------ del comment
function* deleteCommentSaga({idComment, taskId}) {
    try {
        yield call(() => commentServices.deleteComment(idComment))
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskId
        })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherDeleteComment() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}
