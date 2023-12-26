export const getListExport = (accessToken, axiosJWT) => {
    return axiosJWT.get(`${process.env.REACT_APP_URL_API}/v1/api/supplies/get-all-export`, {
        withCredentials: true,
        credentials: true,
        headers: { token: `Bearer ${accessToken}`},
    });
}