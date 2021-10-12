import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/configStore';
import 'antd/dist/antd.css';
import {history} from "./util/settings";

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root')
);
