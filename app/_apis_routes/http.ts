import axios, { AxiosError } from "axios";
import store from "../store";
import { activeErrorAlert } from "../store/actions";

export const axiosInstance = (() => axios.create({
    baseURL: "/api",
    timeout: 30 * 1000,
    withCredentials: true,
    withXSRFToken: true,
}))()


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    store.dispatch(activeErrorAlert({ message: error?.response?.data?.message || error?.message }))
    // Do something with request error
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error: AxiosError<{ message: string }>) {
    store.dispatch(activeErrorAlert({ message: error?.response?.data?.message || error?.message }))
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
