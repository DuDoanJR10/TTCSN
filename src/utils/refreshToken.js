import axios from "axios";

const refreshToken = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_API}/v1/auth/refresh`, null, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log('Error: ', error);
        if (error.response.status === 401) {
            return error.response.data;
        }
        return error
    }
}

export default refreshToken;