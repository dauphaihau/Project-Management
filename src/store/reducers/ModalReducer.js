// const Default = (props) => {
//     return <p>Default Component</p>
// }

import { configConsumerProps } from "antd/lib/config-provider";
import redux from "redux";

const initialState = {
    // Component: Default,
    Component: <p>Default</p>,
    handleSubmit: () => {

    }
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
        default: return {...state};
    }
}