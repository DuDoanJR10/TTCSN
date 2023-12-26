export const getListAccount = (accessToken, axiosJWT) => {
    return axiosJWT.get(`${process.env.REACT_APP_URL_API}/v1/api/account/get-all`, {
        withCredentials: true,
        credentials: true,
        headers: { token: `Bearer ${accessToken}`},
    });
}

export const addAccount = (newAccount, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/account/add`, newAccount, {
        headers: { token: `Bearer ${accessToken}`},
    })
}

export const deleteAccount = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/account/${id}`, {
        headers: { token: `Bearer ${accessToken}`}
    })
}

export const updateCategory = (updateAccount, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/account/update`, updateAccount, {
        headers: { token: `Bearer ${accessToken}`}
    });
}