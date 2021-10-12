import {
    EDIT_PROJECT,
    GET_ALL_PROJECT,
    GET_DETAIL_PROJECT,
    GET_PROJECT_BY_KEYWORD,
    GET_PROJECT_CATEGORY,
} from "../types/Type";

const initialState = {
    detailProject: {},
    listProject: [],
    arrProjectDropdown: [], // use in 'create task'
    projectCategory: [],
    formProjectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "2"
    }
    ,
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT: {
            state.listProject = action.listProject;
            state.arrProjectDropdown = action.listProject;
            return {...state};
        }

        case GET_DETAIL_PROJECT: {
            return {...state, detailProject: action.detailProject};
        }

        case GET_PROJECT_CATEGORY: {
            console.log('action.projectCategory', action.projectCategory);
            return {...state, projectCategory: action.projectCategory}
        }
        case EDIT_PROJECT: {
            return {...state, formProjectEdit: action.currentDataOfProject}
        }
        default:
            return {...state}
    }
}