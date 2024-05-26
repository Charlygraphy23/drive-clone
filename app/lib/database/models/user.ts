import { APP_CONFIG } from '@/app/_config';
import { hash } from 'bcryptjs';
import mongoose from "mongoose";
import { LoginType, UserSchemaDocument, UserSchemaType } from "../interfaces/user.interface";

export const MODEL_NAME = "User" as const;

const saltRounds = APP_CONFIG.BCRYPT_SALT;
const schema = new mongoose.Schema<UserSchemaType>({
    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        select: false
    },

    loginType: {
        type: String,
        enum: LoginType,
        default: LoginType.CREDENTIALS
    },

    imageUrl: {
        type: String,
        default: "",
    }

}, { timestamps: true })


schema.pre("save", async function (next) {
    const password = this.password ?? ""
    const hashedPass = await hash(password, saltRounds);

    this.password = hashedPass
    next();
})

export const UserModel = mongoose.models.User || mongoose.model<UserSchemaDocument>(MODEL_NAME, schema)