/* eslint-disable no-unused-vars */
import { Types } from "mongoose";


export enum LoginType {
    CREDENTIALS = "credentials",
}

export interface UserSchemaType {
    _id: Types.ObjectId | string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    loginType?: LoginType
    createdAt?: Date | string;
    updatedAt?: Date | string;
    imageUrl?: string;
}

export interface UserSchemaDocument extends UserSchemaType, Document { }

export type CreateUser = {
    email: string;
    firstName: string;
    lastName: string;
}