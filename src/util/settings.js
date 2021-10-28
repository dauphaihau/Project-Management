import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();
export const middleWareSaga = createSagaMiddleware();
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIyOC8wMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDYwMDY0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0NjE1NDAwMH0.Aojk9-Qo5B5whL6jc8aZ4IOCm1RF9MrUhORXCrWBwEA'
export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 400,
    SERVER_ERROR:500
}
export const DOMAIN = 'http://casestudy.cyberlearn.vn/api'
export const USER_LOGIN = 'userLogin'
export const ACCESS_TOKEN = 'accessToken'