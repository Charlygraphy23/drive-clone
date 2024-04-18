import axios from "axios";
import { CreateUser } from "../lib/database/interfaces/user.interface";

export const signupApi = ({ email, firstName, lastName }: CreateUser) => {
    return axios.post("/api/users/signup", {
        email, firstName, lastName
    }, {
        timeout: 30 * 1000
    })

}