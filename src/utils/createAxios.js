import axios from "axios";
import { jwtDecode } from "jwt-decode";
import refreshToken from "./refreshToken";

const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken(user.refreshToken);
                if (!data?.accessToken) {
                    dispatch(stateSuccess());
                    config.headers['token'] = `Bearer ${user?.accessToken}`;
                    config.headers['expired'] = true
                } else {
                    const refreshUser = {
                        ...user,
                        accessToken: data?.accessToken
                    }
                    // Update info user
                    dispatch(stateSuccess(refreshUser));
                    config.headers['token'] = `Bearer ${refreshUser?.accessToken}`;
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        })
    return newInstance;
} 

export default createAxios;