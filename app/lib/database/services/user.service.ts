import { ApiResponse } from "@/app/utils/response";
import { FilterQuery, Types } from "mongoose";
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


    async fetchUserWithEmail(email: string, userId: string) {

        const filter = {
            _id: { $ne: new Types.ObjectId(userId) },
        } as FilterQuery<UserSchemaType>

        if (email) {
            filter.email = { $regex: email }
        }
        return await UserModel.find(filter)
    }

    async updateProfile(userId: string, info: { email: string, firstName: string, lastName: string }) {
        const response = new ApiResponse()

        console.log("userId", userId, info)
        const foundUserWithEmail = await UserModel.findOne({ email: info.email, _id: { $ne: new Types.ObjectId(userId) } });

        if (foundUserWithEmail) {
            return response.status(422).send("User already exist with the email ")
        }

        await UserModel.findOneAndUpdate({ _id: new Types.ObjectId(userId) }, { ...info });
        return response.status(200).send("Updated")
    }
}