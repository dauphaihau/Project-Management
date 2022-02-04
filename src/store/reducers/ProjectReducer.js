import {
    EDIT_PROJECT,
    GET_ALL_PROJECT,
    GET_DETAIL_PROJECT,
    GET_PROJECT_CATEGORY,
} from "../types/Type";
import dataDetailProject from '../../assets/data/detailProject.json'
import dataListProject from '../../assets/data/listProject.json'

const initialState = {
    detailProject: dataDetailProject,
    listProject: dataListProject,
    arrProjectDropdown: [], // use in 'create task'
    projectCategory: [
        {
            "id": 1,
            "projectCategoryName": "Dự án web"
        },
        {
            "id": 2,
            "projectCategoryName": "Dự án phần mềm"
        },
        {
            "id": 3,
            "projectCategoryName": "Dự án di động"
        }
    ],
    formProjectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "2"
    }
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT: {
            state.listProject = action.listProject;
            state.arrProjectDropdown = action.listProject;
            console.log('abc',action.arrProjectDropdown)
            return {...state};
        }
        case GET_DETAIL_PROJECT: {
            return {...state, detailProject: action.detailProject};
        }
        case GET_PROJECT_CATEGORY: {
            return {...state, projectCategory: action.projectCategory}
        }
        case EDIT_PROJECT: {
            return {...state, formProjectEdit: action.currentDataOfProject}
        }
        default:
            return {...state}
    }
}