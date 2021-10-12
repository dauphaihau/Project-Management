import React from 'react';
import styleLoading from './LoadingComponent.module.css'
import {useSelector} from "react-redux";

function LoadingComponent(props) {

    const {isLoading} = useSelector(state => state.LoadingReducer)

    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img height={100} src='./img/giphy.gif'/>
            </div>
        );
    } else {
        return ''
    }
}

export default LoadingComponent;