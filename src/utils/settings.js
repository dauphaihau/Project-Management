import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();
export const middleWareSaga = createSagaMiddleware();
// export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOT0RFSlMgMTkiLCJIZXRIYW5TdHJpbmciOiIwMy8wNi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NTQyMTQ0MDAwMDAiLCJuYmYiOjE2Mzc1MTQwMDAsImV4cCI6MTY1NDM2MjAwMH0.RK-VEwae4Dr3J-Gwel9Dr993e1HwLIhZEGdMnaxqmUE'
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIzMC8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg1OTg0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0ODc0NjAwMH0.N_fGufzvG8LNffZDL7TGqoRt10gi2jpPbqfgAzpvx9c'
export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 400,
    SERVER_ERROR:500
}
export const DOMAIN = 'http://casestudy.cyberlearn.vn/api'
export const USER_LOGIN = 'userLogin'
export const ACCESS_TOKEN = 'accessToken'