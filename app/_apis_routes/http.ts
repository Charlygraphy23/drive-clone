import axios from "axios";

export const axiosInstance = (() => axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 30 * 1000,
    withCredentials: true,
    withXSRFToken: true,
}))()