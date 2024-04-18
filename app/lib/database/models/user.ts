import { hash } from 'bcrypt';
import mongoose, { Schema, model } from "mongoose";
import { LoginType, UserSchemaDocument, UserSchemaType } from "../interfaces/user.interface";

export const MODEL_NAME = "User" as const;

const saltRounds = 10;
const schema = new Schema<UserSchemaType>({
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

}, { timestamps: true })


schema.pre("save", async function (next) {
    const password = this.password ?? ""
    hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        this.password = hash
    });
    next();
})

export const UserModel = mongoose.models.User || model<UserSchemaDocument>(MODEL_NAME, schema)