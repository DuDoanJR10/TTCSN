import axios from "axios";

export const addSupplies = (newSupplies, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/supplies/add`, newSupplies, {
        headers: { token: `Bearer ${accessToken}` }
    });
}

export const updateSupplies = (updateSupplies, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/supplies/update`, updateSupplies, {
        headers: { token: `Bearer ${accessToken}` }
    });
}

export const getListSupplies = () => {
    return axios.get(`${process.env.REACT_APP_URL_API}/v1/api/supplies/get-all`);
}

export const deleteSupplies = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/supplies/${id}`, {
        headers: { token: `Bearer ${accessToken}` }
    })
}

export const exportSupplies = (dataExport, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/supplies/export`, dataExport,
        {
            headers: { token: `Bearer ${accessToken}` }
        })
}

export const importSupplies = (dataImport, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/supplies/import`, dataImport,
        {
            headers: { token: `Bearer ${accessToken}` }
        })
}