
export const getListStaff = (accessToken, axiosJWT) => {
    return axiosJWT.get(`${process.env.REACT_APP_URL_API}/v1/api/staff/get-all`, {
        withCredentials: true,
        credentials: true,
        headers: { token: `Bearer ${accessToken}` },
    });
}

export const addStaff = (newStaff, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/staff/add`, newStaff, {
        headers: { token: `Bearer ${accessToken}` }
    });
}

export const updateStaff = (updateStaff, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/staff/update`, updateStaff, {
        headers: { token: `Bearer ${accessToken}` }
    });
}

export const deleteStaff = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/staff/${id}`, {
        headers: { token: `Bearer ${accessToken}` }
    })
}