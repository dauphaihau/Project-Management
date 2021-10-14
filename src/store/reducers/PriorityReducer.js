import {GET_ALL_PRIORITY} from "../types/Type";

const initialState = {
    arrPriority: [
        {
            alias: "High",
            deleted: false,
            description: "High",
            priority: "High",
            priorityId: 1,
        }
    ]
}

export const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRIORITY: {
            return {...state, arrPriority: action.arrPriority}
        }
        default:
            return state
    }
}

