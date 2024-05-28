import { APP_CONFIG } from "@/app/_config";
import { CRYPTO } from "@/app/utils/crypto";
import { ApiResponse } from "@/app/utils/response";
import { LOCAL_S3 } from "@/app/utils/s3";
import { hash } from "bcryptjs";
import { File } from "buffer";
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

    async updatePassword(userId: string, password: string) {
        const hashedPassword = await hash(password, APP_CONFIG.BCRYPT_SALT);
        return await UserModel.findByIdAndUpdate({ _id: new Types.ObjectId(userId) }, { password: hashedPassword });
    }

    async updateProfileImage(file: File, userId: string) {
        const arrayBuffer = await file.arrayBuffer()
        const key = `${userId}/profile__image__`
        const encryptedKey = CRYPTO.encryptWithBase64(key)

        const s3 = new LOCAL_S3({
            key,
            body: arrayBuffer
        })

        await s3.put()
        await UserModel.findByIdAndUpdate({ _id: new Types.ObjectId(userId) }, {
            imageUrl: encryptedKey
        })
    }

    async getProfileImage(userId: string) {
        const userData = await (UserModel.findById({ _id: new Types.ObjectId(userId) }).select("+imageUrl"));

        const key = CRYPTO.decryptTextFromBase64(userData?.imageUrl);

        const s3 = new LOCAL_S3({
            key
        })

        const data = await s3.get()
        const array = await data?.Body?.transformToByteArray()
        if (!array) throw new Error("No Content")

        return array
    }
}