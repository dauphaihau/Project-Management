import {call, put, takeLatest, takeEvery, delay} from 'redux-saga/effects'
import {history, STATUS_CODE} from '../../../util/settings'
import {projectServices} from '../../services/ProjectServices'
import {notifiFuntion} from "../../../util/Notification";
import {
    CLOSE_DRAWER,
    CREATE_PROJECT_SAGA,
    DELETE_PROJECT_SAGA,
    DISPLAY_LOADING,
    GET_ALL_PROJECT,
    GET_ALL_PROJECT_SAGA,
    GET_DETAIL_PROJECT,
    GET_DETAIL_PROJECT_SAGA,
    GET_PROJECT_CATEGORY,
    GET_PROJECT_CATEGORY_SAGA,
    GET_USER_BY_PROJECT_ID,
    HIDE_LOADING,
    UPDATE_PROJECT_SAGA
} from '../../types/Type'

// --------get all project
function* getAllProjectSaga(action) {
    let {keyWord} = action
    try {
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(600)
        const {data, status} = yield call(() => projectServices.getAllProject(keyWord))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: HIDE_LOADING
            })
            yield put({
                type: GET_ALL_PROJECT,
                listProject: data.content
            })
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                idProject: data.content[0].id
            })
        }
    } catch (error) {
        console.log(error);
    }

}

export function* WatcherGetAllProject() {
    yield takeEvery(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}

// -------- detail project
function* getDetailProjectSaga(action) {

    try {
        const {data, status} = yield call(() => projectServices.getProjectDetail(action.projectId))
        yield put({
            type: GET_DETAIL_PROJECT,
            detailProject: data.content
        })
    } catch (error) {
        console.log(error);
        // history.push('/')
    }

}

export function* WatcherGetDetailProject() {
    yield takeEvery(GET_DETAIL_PROJECT_SAGA, getDetailProjectSaga)
}


// -------- project category
function* getProjectCategorySaga(action) {

    try {
        const {data, status} = yield call(() => projectServices.getProjectCategory())
        yield put({
            type: GET_PROJECT_CATEGORY,
            projectCategory: data.content
        })

    } catch (error) {
        console.log(error);
    }
}

export function* WatcherGetProjectCategory() {
    yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga)
}


// --------create project
function* createProjectSaga(action) {

    try {
        yield delay(500)
        yield call(() => projectServices.createProjectAuthorization(action.newProject))

        yield put({type: CLOSE_DRAWER})
        notifiFuntion('success', 'create project successfully')

        yield put({type: GET_ALL_PROJECT_SAGA /* refresh data after change*/})
    } catch (error) {
        if (error.response.status === 500) {
            alert(error.response.data.content)
        }
    }
}

export function* WatcherCreateProject() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}


// -------- update project
function* updateProjectSaga(action) {

    try {
        const {data, status} = yield call(() => projectServices.updateProject(action.dataEdited))
        console.log(data, status)
        if (status === STATUS_CODE.SUCCESS) {
            notifiFuntion('success', 'Update project successfully')
        } else {
            notifiFuntion('error', 'Update project fail')
        }
        if (data.statusCode === STATUS_CODE.SUCCESS) {
            yield put({
                type: CLOSE_DRAWER
            })
        }
        yield put({
            type: GET_ALL_PROJECT_SAGA // refresh data after change
        })
        history.push('/projects')
    } catch (error) {
        console.log(error);
        notifiFuntion('error', 'Update project fail')
    }
}

export function* WatcherUpdateProject() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}


// -------- delete project
function* deleteProjectSaga(action) {

    try {
        console.log('id', action.idProject);
        const {data, status} = yield call(() => projectServices.deleteProject(action.idProject))

        if (status === STATUS_CODE.SUCCESS) {
            notifiFuntion('success', 'Delete project successfully')
        } else {
            notifiFuntion('error', 'Delete project fail')
        }
        yield put({
            type: GET_ALL_PROJECT_SAGA // refresh data after change
        })
    } catch (error) {
        console.log(error);
        notifiFuntion('error', 'Delete project fail')
    }
}

export function* WatcherDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}

