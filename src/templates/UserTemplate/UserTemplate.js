import React, { Fragment } from 'react';
import {Route} from 'react-router-dom'

export const UserTemplate = (props) => {

    return <Route path={props.path} render={(propsRoute) => {
        console.log('props', props)
        console.log('propsRoute', propsRoute);
        return <Fragment>
            <div className="d-flex my-account">
                <div className="left-content">
                    <img className="w-100 vh-100" src="https://picsum.photos/2000/2000" alt="..." />
                </div>
                <div className="right-content d-flex justify-content-center align-items-center">
                    <div className="wrapper">
                        <props.component {...propsRoute} />
                    </div>
                </div>
            </div>
        </Fragment>
    }} />
}