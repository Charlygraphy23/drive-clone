import { generatePassword } from "../../lib";
import { CreateUser, UserSchemaType } from "../interfaces/user.interface";
import { UserModel } from "../models/user";

export class UserService {
    async findByEmail(email: string, select: string | Partial<Record<keyof UserSchemaType, number>> = "") {
        return await UserModel.findOne({ email }).select(select)
    }

    async createUserWithoutPass({ email, firstName, lastName }: CreateUser) {
        const randomString = await generatePassword();
        console.log("Password-", randomString)
        return await UserModel.create([{ email, firstName, lastName, password: randomString }])
    }
}