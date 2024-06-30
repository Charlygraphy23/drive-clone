import { APP_CONFIG } from "@/app/_config";
import { CRYPTO } from "@/app/utils/crypto";
import { ApiResponse } from "@/app/utils/response";
import { LOCAL_S3 } from "@/app/utils/s3";
import { hash } from "bcryptjs";
import { File } from "buffer";
import mongoose, { FilterQuery, Types } from "mongoose";
import { generatePassword, userInfoProjectionAggregationQuery } from "../../lib";
import { CreateUser, UserSchemaType } from "../interfaces/user.interface";
import { UserModel } from "../models/user";


export class UserService {
    async findByEmail(email: string, select: string | Partial<Record<keyof UserSchemaType, number>> = "") {
        return await UserModel.findOne({ email }).select(select)
    }

    async findById(userId: string) {
        return UserModel.findOne({ _id: new mongoose.Types.ObjectId(userId) })
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
        return await UserModel.aggregate([
            {
                $match: filter
            },
            userInfoProjectionAggregationQuery()
        ])

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
        const hasUser = await this.findById(userId)

        if (!hasUser) throw new Error("User not found")

        const arrayBuffer = await file.arrayBuffer()
        const key = `${userId}/profile__image__${Date.now()}`
        const encryptedKey = CRYPTO.encryptWithBase64(key)
        const oldImageUrl = hasUser?.imageUrl

        if (oldImageUrl) {
            const decryptKey = CRYPTO.decryptTextFromBase64(oldImageUrl);
            const s3 = new LOCAL_S3({
                key: decryptKey,
            })
            await s3.delete();
        }

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

        if (!userData?.imageUrl) return ""

        const key = CRYPTO.decryptTextFromBase64(userData?.imageUrl);

        if (!key) return ""

        const s3 = new LOCAL_S3({
            key
        })
        const data = await s3.get()

        const body = data?.Body as ReadableStream
        if (!body) throw new Error("No Content")
        return body
    }
}