import { CreateUser, UserSchemaType } from "../lib/database/interfaces/user.interface";
import { axiosInstance } from "./http";

export const signupApi = ({ email, firstName, lastName }: CreateUser) => {
    return axiosInstance.post("/users/signup", {
        email, firstName, lastName
    })

}

export const getUsersByEmail = async (email?: string): Promise<Record<keyof UserSchemaType, string>[]> => {
    const { data } = await axiosInstance.get(`/users/email/${email}`)

    return data.data ?? []
}

export const updateProfileApi = async (payload: { email: string, firstName: string, lastName: string }) => {
    return await axiosInstance.put(`/users`, payload)
}

export const changePasswordApi = async (payload: { newPassword: string, confirmPassword: string }) => {
    return await axiosInstance.post(`/users`, payload)
}

export const updateImageApi = async (formData: FormData) => {
    return await axiosInstance.post(`/users/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const forgotPasswordApi = async (email: string) => {
    return await axiosInstance.post(`/users/forgot-password`, { email })
}

export const resetPasswordApi = async ({ newPassword, confirmPassword, hash }: { newPassword: string, confirmPassword: string, hash: string }) => {
    const data = await axiosInstance.post(`/users/reset`, { newPassword, confirmPassword, hash })
    return data
}