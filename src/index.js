import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/configStore';
import 'antd/dist/antd.css';
import {history} from "./util/settings";
import {createTheme, ThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            // main: '#1b55c5'
            main: '#4090f6'
        },
        background: {
            default: '#fff'
        }
    }, breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1200,
            xl: 1536,
        },
    },
});

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);
