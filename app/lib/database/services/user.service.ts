import { BUCKET_PATH } from "@/app/_config/const";
import { ApiResponse } from "@/app/utils/response";
import { s3Client } from "@/app/utils/s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { File } from "buffer";
import { FilterQuery, Types } from "mongoose";
import { NextResponse } from "next/server";
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
        return await UserModel.findByIdAndUpdate({ _id: new Types.ObjectId(userId) }, { password });
    }

    async updateProfileImage(file: File) {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer);
        const filename = file.name.replaceAll(" ", "_");

        const command = new PutObjectCommand({
            Bucket: BUCKET_PATH,
            Key: `randomuserId/${filename}`,
            Body: buffer,
            ServerSideEncryption: "AES256",
        })



        const res = await s3Client.send(command)

        console.log(res)
    }

    async getProfileSignedUrl(_res: NextResponse) {

        const command = new GetObjectCommand({
            Bucket: BUCKET_PATH,
            Key: `randomuserId/avatar.jpeg`,
        })

        const res = await s3Client.send(command)
        const stream = res.Body?.transformToWebStream()
        stream?.pipeThrough(_res)
    }
}