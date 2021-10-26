// const Default = (props) => {
//     return <p>Default Component</p>
// }

import {
    CLOSE_USER_MODAL,
    OPEN_FORM_CREATE_USER, OPEN_FORM_EDIT_USER,
    OPEN_USER_MODAL,
    SET_SUBMIT_CONTENT_MODAL
} from "../types/Type";

const initialState = {
    Component: <p>Default</p>,
    handleSubmit: () => {},
    title: '',
    visible: false
}

export const ModalReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'OPEN_PROJECT': {
            console.log('open project');
            state.Component = action.Component;
            state.handleSubmit = action.handleSubmit;
            return {...state};
        }
        case 'OPEN_TASK': {
            state.Component = action.Component;
            state.handleSubmit = action.handleSubmit;
            return {...state};
        }
        case OPEN_USER_MODAL : {
            return {...state, visible: false}
        }
        case CLOSE_USER_MODAL : {
            return {...state, visible: false}
        }
        case OPEN_FORM_CREATE_USER :{
            return {...state, visible: true, Component: action.Component, title: action.title}
        }
        case OPEN_FORM_EDIT_USER :{
            return {...state, visible: true, Component: action.Component, title: action.title}
        }
        case SET_SUBMIT_CONTENT_MODAL: {
            return {...state, handleSubmit: action.submitFn}
        }
        default: return {...state};
    }
}