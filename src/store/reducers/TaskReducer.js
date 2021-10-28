import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL, GET_ALL_COMMENT,
    GET_TASK_DETAIL,
    REMOVE_USER_ASSIGN,
} from "../types/Type";

const initialState = {
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 3,
            "priority": "Low"
        },
        "taskTypeDetail": {
            "id": 2,
            "taskType": "new task"
        },
        "assigness": [
            {
                "id": 116,
                "avatar": "https://ui-avatars.com/api/?name=Man xanh",
                "name": "Man xanh",
                "alias": "man-nguyen"
            },
            {
                "id": 6,
                "avatar": "https://ui-avatars.com/api/?name=sacacadadxxca",
                "name": "sacacadadxxca",
                "alias": "khai"
            },
            {
                "id": 248,
                "avatar": "https://ui-avatars.com/api/?name=thangaccacaaca",
                "name": "thangaccacaaca",
                "alias": "thang"
            }
        ],
        "lstComment": [],
        "taskId": 1280,
        "taskName": "acaca",
        "alias": "acaca",
        "description": "<p>adada</p>",
        "statusId": "3",
        "originalEstimate": 24,
        "timeTrackingSpent": 38,
        "timeTrackingRemaining": 0,
        "typeId": 2,
        "priorityId": 3,
        "projectId": 1452
    },
    lstTask: [],
    formTaskEdit: {
        listUserAsign: [],
        taskId: '',
        taskName: '',
        description: '',
        statusId: '',
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0
    }
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL: {
            return {...state, taskDetailModal: action.taskDetailModal}
        }
        case CHANGE_TASK_MODAL: {
            const {name, value} = action;
            console.log('task-detail-modal-reducer', state.taskDetailModal)
            return {...state, taskDetailModal: {...state.taskDetailModal, [name]: value}}
        }
        case CHANGE_ASSIGN : {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected]
            return {...state}
        }
        case REMOVE_USER_ASSIGN: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
            return {...state}
        }
        case GET_ALL_COMMENT: {
            return {...state, taskDetailModal: {...state.taskDetailModal, lstComment: action.dataComment}}
        }
        default:
            return state
    }
}

