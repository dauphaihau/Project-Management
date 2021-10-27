import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
    OPEN_FORM_CREATE_PROJECT,
    OPEN_FORM_EDIT_PROJECT,
    SET_SUBMIT_CONTENT,
    OPEN_FORM_EDIT_TASK, OPEN_FORM_CREATE_TASK,
} from "../types/Type";
import React from 'react'

const initialState = {
    visible: false,
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit: () => {
        alert('HI')
    },
    title: '',
}

export const DrawerModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER: {
            return {...state, visible: true}
        }
        case CLOSE_DRAWER: {
            return {...state, visible: false}
        }
        case SET_SUBMIT_CONTENT: {
            return {...state, callBackSubmit: action.submitFn}
        }
        case OPEN_FORM_EDIT_PROJECT: {
            return {
                ...state, visible: true, ComponentContentDrawer: action.Component
                , title: action.title
            }
        }
        case OPEN_FORM_CREATE_PROJECT: {
            return {
                ...state, visible: true, ComponentContentDrawer: action.Component,
                title: action.title
            }
        }
        case OPEN_FORM_EDIT_TASK: {
            return {
                ...state, visible: true, ComponentContentDrawer: action.Component
                , title: action.title
            }
        }
        case OPEN_FORM_CREATE_TASK: {
            return {
                ...state, visible: true, ComponentContentDrawer: action.Component,
                title: action.title
            }
        }
        default:
            return state
    }
}

