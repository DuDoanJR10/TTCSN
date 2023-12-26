import axios from "axios";

export const getListCategories = () => {
    return axios.get(`${process.env.REACT_APP_URL_API}/v1/api/category/get-all`);
}

export const addCategory = (newCategory, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/category/add`, newCategory, {
        headers: { token: `Bearer ${accessToken}`}
    });
}

export const updateCategory = (updateCategory, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/category/update`, updateCategory, {
        headers: { token: `Bearer ${accessToken}`}
    });
}

export const deleteCategory = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/category/${id}`, {
        headers: { token: `Bearer ${accessToken}`}
    })
}