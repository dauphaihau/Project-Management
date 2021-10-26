import {GET_ALL_COMMENT} from "../types/Type";

const initialState = {
    dataComment: []
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_COMMENT: {
            return {...state, dataComment: action.dataComment}
        }
        default:
            return state
    }
}

