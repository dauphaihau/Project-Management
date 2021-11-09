import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {middleWareSaga} from '../utils/settings'
import {rootSaga} from './sagas/rootSaga';
import {UserReducer} from './reducers/UserReducer';
import {ProjectReducer} from './reducers/ProjectReducer'
import {TaskReducer} from './reducers/TaskReducer'
import {PriorityReducer} from "./reducers/PriorityReducer";
import {StatusReducer} from "./reducers/StatusReducer";
import {TaskTypeReducer} from "./reducers/TaskTypeReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {ModalReducer} from "./reducers/ModalReducer";
import {DrawerModalReducer} from "./reducers/DrawerModalReducer";
import {NotificationReducer} from "./reducers/NotificationReducer";

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    LoadingReducer,
    ModalReducer,
    DrawerModalReducer,
    NotificationReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));

middleWareSaga.run(rootSaga)

export default store;