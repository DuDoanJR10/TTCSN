import instanceAxios from '../../../utils/instanceAxios';

export const login = async (user) => {
    try {
        const res = await instanceAxios.post(`${process.env.REACT_APP_URL_API}/v1/auth/login`, user, {
            withCredentials: true,
            credentials: true,
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const register = async (user) => {
    try {
        const res = await instanceAxios.post(`${process.env.REACT_APP_URL_API}/v1/auth/register`, user);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const logout = async (axiosJWT, accessToken, id) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/auth/logout`, id, {
            withCredentials: true,
            credentials: true,
            headers: { token: `Bearer ${accessToken}`},
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}