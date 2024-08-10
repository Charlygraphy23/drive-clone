import { axiosInstance } from "./http"

export const purchaseSubscription = async (planId: string) => {
    return await axiosInstance.post("/purchase", { planId })
}