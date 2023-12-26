import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: 'process.env.REACT_APP_URL_API',
});

export default instanceAxios;