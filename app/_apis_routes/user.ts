import { CreateUser, UserSchemaType } from "../lib/database/interfaces/user.interface";
import { axiosInstance } from "./http";

export const signupApi = ({ email, firstName, lastName }: CreateUser) => {
    return axiosInstance.post("/users/signup", {
        email, firstName, lastName
    })

}

export const getUsersByEmail = async (email?: string): Promise<Record<keyof UserSchemaType, string>[]> => {
    const { data } = await axiosInstance.post("/users", { email })

    return data.data ?? []
}