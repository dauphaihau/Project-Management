import axios from "axios";
import {ACCESS_TOKEN, DOMAIN, TOKEN_CYBERSOFT} from "../../utils/settings";

const requestHeaders = {
    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    'TokenCybersoft': TOKEN_CYBERSOFT
}


export class baseService {
    put = (url, data) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: data,
            headers: requestHeaders
        });
    }

    post = (url, data) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: data,
            headers: requestHeaders
        });
    }

    get = (url) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: requestHeaders
        });
    }

    delete = (url) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: requestHeaders
        });
    }
}