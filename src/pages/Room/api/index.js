export const getListRoom = (accessToken, axiosJWT) => {
    return axiosJWT.get(`${process.env.REACT_APP_URL_API}/v1/api/room/get-all`, {
        withCredentials: true,
        credentials: true,
        headers: { token: `Bearer ${accessToken}`},
    });
}

export const deleteRoom = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/room/${id}`, {
        headers: { token: `Bearer ${accessToken}`}
    })
}

export const addRoom = (newRoom, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/room/add`, newRoom, {
        headers: { token: `Bearer ${accessToken}`}
    });
}

export const updateRoom = (updateRoom, axiosJWT, accessToken) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/room/update`, updateRoom, {
        headers: { token: `Bearer ${accessToken}`}
    });
}

export const deleteCategory = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/room/${id}`, {
        headers: { token: `Bearer ${accessToken}`}
    })
}