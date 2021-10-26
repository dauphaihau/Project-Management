import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL,
    GET_TASK_DETAIL,
    REMOVE_USER_ASSIGN,
    ADD_CARD,
    ADD_LIST,
    DRAG_HAPPENED
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
    taskList: [
        {
            id: `list-1`,
            taskType: "bug",
            taskDetailList: [
                {id: `card-1`, title: "product issue"},
                {id: `card-2`, title: "product issue2"},
                {id: `card-3`, title: "product issue3"},
            ]
        },
        {
            id: `list-2`,
            taskType: "new task",
            taskDetailList: [
                {id: `card-4`, title: "page issue"},
                {id: `card-5`, title: "page issue2"},
            ]
        }
    ],
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
            console.log('state-task-detail-modal', state.taskDetailModal)
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
        case ADD_CARD: {
            const {card} = action.card;
            console.log('adding card', {card});
            console.log('task list', state.taskList);
            let index = state.taskList.findIndex(taskList => taskList.id === card.taskListId);
            console.log('index', index);
            if (index !== -1) {
                const updatedTaskList = [...state.taskList];
                updatedTaskList[index].taskDetailList.push(
                    {
                        id: card.cardId,
                        title: card.text
                    }
                );
                state.taskList = [...updatedTaskList];
            }
            console.log('state', state);
            return {...state};
        }
        case ADD_LIST: {
            //console.log('added list');
            const newList = {
                id: 5,
                taskType: action.listTitle,
                taskDetailList: []
            }
            state.taskList = [...state.taskList, newList];
            return {...state}
        }
        case DRAG_HAPPENED: {
            console.log('dragged');
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.sortItem;
            const newState = {...state};

            //drag task
            if (type === "list") {
                const task = newState.taskList.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...task);
                return newState;
            }

            //drag and drop card inside the same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.taskList.find(list => droppableIdStart === list.id);

                //cut the dragged card position
                const card = list.taskDetailList.splice(droppableIndexStart, 1);

                //insert the card into a new position
                list.taskDetailList.splice(droppableIndexEnd, 0, ...card);
                console.log(action.sortItem);
                console.log('new state', newState);
            }

            //drag and drop card to another list
            if (droppableIdStart !== droppableIdEnd) {
                //find the list where drag happened
                const listStart = state.taskList.find(list => droppableIdStart === list.id);

                //cut the dragged card position
                const card = listStart.taskDetailList.splice(droppableIndexStart, 1);

                //find the list that the card is dragged to
                const listEnd = state.taskList.find(list => droppableIdEnd === list.id);

                //put the card in the new list
                listEnd.taskDetailList.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }
        default:
            return state
    }
}

