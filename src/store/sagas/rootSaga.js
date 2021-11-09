import {all} from 'redux-saga/effects'
import * as UserSaga from './WatcherSagas/UserSaga'
import * as ProjectSaga from './WatcherSagas/ProjectSaga'
import * as TaskSaga from './WatcherSagas/TaskSaga'
import * as TaskTypeSaga from './WatcherSagas/TaskTypeSaga'
import * as PrioritySaga from './WatcherSagas/PrioritySaga'
import * as StatusSaga from './WatcherSagas/StatusSaga'
import * as CommentSaga from './WatcherSagas/CommentSaga'

export function *rootSaga() {
    yield all([
        UserSaga.WatcherLogin(),
        UserSaga.WatcherRegister(),
        UserSaga.WatcherDeleteUserFromProject(),
        UserSaga.WatcherGetUserByProjectId(),
        UserSaga.WatcherGetUser(),
        UserSaga.WatcherAddUser(),
        UserSaga.WatcherCreateUser(),
        UserSaga.WatcherDeleteUser(),
        UserSaga.WatcherEditUser(),
        UserSaga.WatcherAssignUserTask(),

        ProjectSaga.WatcherGetAllProject(),
        ProjectSaga.WatcherGetDetailProject(),
        ProjectSaga.WatcherGetProjectCategory(),
        ProjectSaga.WatcherCreateProject(),
        ProjectSaga.WatcherUpdateProject(),
        ProjectSaga.WatcherDeleteProject(),

        TaskTypeSaga.WatcherGetAllTask(),
        PrioritySaga.WatcherGetAllPriority(),
        StatusSaga.WatcherGetAllStatus(),

        TaskSaga.WatcherGetTaskDetail(),
        TaskSaga.WatcherCreateTask(),
        TaskSaga.WatcherRemoveTask(),
        TaskSaga.WatcherUpdateStatusTask(), // update status task
        TaskSaga.WatcherHandleChangePostApi(), // update all task

        CommentSaga.WatcherGetAllComment(),
        CommentSaga.WatcherDeleteComment(),
        CommentSaga.WatcherInsertComment(),
        CommentSaga.WatcherUpdateComment(),
    ])
}
