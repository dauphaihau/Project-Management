import {GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, GET_ALL_PROJECT} from "../types/Type";

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

