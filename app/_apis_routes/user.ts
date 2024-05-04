import { CreateUser } from "../lib/database/interfaces/user.interface";
import { axiosInstance } from "./http";

export const signupApi = ({ email, firstName, lastName }: CreateUser) => {
    return axiosInstance.post("/users/signup", {
        email, firstName, lastName
    })

}