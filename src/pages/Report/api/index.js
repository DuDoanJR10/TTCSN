export const getListReport = (date, accessToken, axiosJWT) => {
    return axiosJWT.post(`${process.env.REACT_APP_URL_API}/v1/api/supplies/get-report`, date, {
        withCredentials: true,
        credentials: true,
        headers: { token: `Bearer ${accessToken}`},
    });
}