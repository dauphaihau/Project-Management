import {call, put, takeLatest, takeEvery, delay} from 'redux-saga/effects'
import {STATUS_CODE} from '../../../util/settings'
import {projectServices} from '../../services/ProjectServices'
import {
    CLOSE_DRAWER,
    CREATE_PROJECT_SAGA,
    DELETE_PROJECT_SAGA, DISPLAY_ALERT,
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

// -------- get all project
function* getAllProjectSaga({keyWord}) {
    try {
        yield put({type: DISPLAY_LOADING})
        yield delay(600)
        yield put({type: HIDE_LOADING})
        const {data, status} = yield call(() => projectServices.getAllProject(keyWord))
        if (status === STATUS_CODE.SUCCESS) {
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
        console.log({error});
    }

}

export function* WatcherGetAllProject() {
    yield takeEvery(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}

// -------- get detail project
function* getDetailProjectSaga({projectId}) {
    try {
        const {data} = yield call(() => projectServices.getProjectDetail(projectId))
        yield put({
            type: GET_DETAIL_PROJECT,
            detailProject: data.content
        })
    } catch (error) {
        console.log({error});
    }
}

export function* WatcherGetDetailProject() {
    yield takeEvery(GET_DETAIL_PROJECT_SAGA, getDetailProjectSaga)
}


// -------- get project category
function* getProjectCategorySaga() {

    try {
        const {data} = yield call(() => projectServices.getProjectCategory())
        yield put({
            type: GET_PROJECT_CATEGORY,
            projectCategory: data.content
        })

    } catch (error) {
        console.log({error});
    }
}

export function* WatcherGetProjectCategory() {
    yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga)
}


// -------- create project
function* createProjectSaga({newProject}) {

    try {
        yield delay(500)
        yield call(() => projectServices.createProjectAuthorization(newProject))
        yield put({type: CLOSE_DRAWER})
        yield put({type: DISPLAY_ALERT, message: 'Create project successfully'})
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
function* updateProjectSaga({dataEdited}) {

    try {
        const {status} = yield call(() => projectServices.updateProject(dataEdited))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type: GET_ALL_PROJECT_SAGA})
            yield put({type: CLOSE_DRAWER})
            yield put({type: DISPLAY_ALERT, message: 'Update project successfully'})
        }
    } catch (error) {
        console.log({error});
        yield put({type: DISPLAY_ALERT, message: 'Update project fail'})
    }
}

export function* WatcherUpdateProject() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}


// -------- delete project
function* deleteProjectSaga({idProject}) {

    try {
        const {status} = yield call(() => projectServices.deleteProject(idProject))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type: GET_ALL_PROJECT_SAGA})
            yield put({type: DISPLAY_ALERT, message: 'Delete project successfully'})
        }
    } catch (error) {
        console.log({error});
        yield put({type: DISPLAY_ALERT, message: 'Delete project fail'})
    }
}

export function* WatcherDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}

