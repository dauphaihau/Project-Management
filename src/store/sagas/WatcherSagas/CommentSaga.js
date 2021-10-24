import {call, takeLatest, put, takeEvery} from "redux-saga/effects";
import {
    DELETE_COMMENT_SAGA,
    GET_ALL_COMMENT,
    GET_ALL_COMMENT_SAGA,
    INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA
} from "../../types/Type";
import {commentServices} from "../../services/CommentServices";

// ----------------- get all Comment
function* getAllCommentSaga({idTask}) {
    console.log('id-task', idTask)
    try {
        const {data} = yield call(() => commentServices.getAllComment(idTask))
        yield put({
            type: GET_ALL_COMMENT,
            dataComment: data.content
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
    console.log('info-comment', infoComment)
    try {
        yield call(() => commentServices.insertComment(infoComment))
        // yield put({
        //     type: GET_ALL_COMMENT_SAGA,
        //     idTask: infoComment.idTask
        // })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherInsertComment() {
    yield takeEvery(INSERT_COMMENT_SAGA, insertCommentSaga)
}

// ------------------ update comment
function* updateCommentSaga({infoComment}) {
    console.log('info-comment', infoComment)
    try {
        const {data, status} = yield call(() => commentServices.updateComment(infoComment))
        // yield put({
        //     type: GET_ALL_COMMENT_SAGA
        // })
        // alert('success')
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherUpdateComment() {
    yield takeEvery(UPDATE_COMMENT_SAGA, updateCommentSaga)
}


// ------------------ del comment
function* deleteCommentSaga({idComment}) {

    console.log('id-comment', idComment)
    try {
        const {status} = yield call(() => commentServices.deleteComment(idComment))
        // yield put({
        //     type: GET_ALL_COMMENT_SAGA
        // })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherDeleteComment() {
    yield takeEvery(DELETE_COMMENT_SAGA, deleteCommentSaga)
}
