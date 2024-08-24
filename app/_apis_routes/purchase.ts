import { AxiosResponse } from "axios";
import { axiosInstance } from "./http";

export const purchaseSubscription = async (planId: string): Promise<AxiosResponse<{
    message: string;
    data?: {
        razorpayOrderId: string,
        amount: number,
        currency: string,
    } | null
}>> => {
    return await axiosInstance.post("/purchase", { planId })
}