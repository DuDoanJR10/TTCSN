import axios from 'axios';
import JWT from './jwt';

const HEADERS__DEFAULT = {
    'Content-Type': 'application/json'
}
axios.defaults.withCredentials = 'include';

const HttpService = {
    configRequest(multipart = false) {
        let headersDefault = HEADERS__DEFAULT;
        if (multipart) {
            headersDefault = {};
        }
        if (JWT.getAccessToken()) {
            headersDefault = {
                'Authorization': `Bearer ${JWT.getAccessToken()}`,
                Accept: 'application/json',
                Cache: 'no-cache',
                common: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                ...headersDefault
            }
        }
        return {
            headers: headersDefault,
        }
    }
}

export default HttpService;