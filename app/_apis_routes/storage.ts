import { axiosInstance } from "./http"

export const getStorageApi = () => {
    return axiosInstance.get("/storage")
}