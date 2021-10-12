import {notification} from "antd";

export const notifiFuntion = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        duration: 3.5,
    })
}