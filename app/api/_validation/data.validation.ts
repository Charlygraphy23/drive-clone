import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import mongoose from "mongoose";
import { object, string } from "yup";

const folderNameValidation = string().matches(/^[a-zA-Z\s\d)(-_]+$/, 'Field must contain only alphabetic characters').required()

export const MongoIdSchemaValidation = string().test({
    name: "valid-mongodb-id",
    message: "Invalid item ID",
    test: (value) => {
        return mongoose.Types.ObjectId.isValid(value ?? "");
    },
}).required()


export const DataCreateSchemaValidator = object().shape({
    name: folderNameValidation,
    type: string().oneOf([DATA_TYPE.FILE, DATA_TYPE.FOLDER]).required(),
    parentFolderId: string().when("$parentFolderId", {
        is: (value: string) => {
            return value !== null && value !== undefined;
        },
        then: () => string().test({
            name: "valid-mongodb-id",
            message: "Invalid item ID",
            test: (value) => {
                if (value === null || value === undefined) return true
                return mongoose.Types.ObjectId.isValid(value ?? "");

            },
        }),
        otherwise: () => string().notRequired()
    })
})

export const UpdateNamePayloadSchema = object().shape({
    folderId: string().test({
        name: "valid-mongodb-id",
        message: "Invalid item ID",
        test: (value) => {
            return mongoose.Types.ObjectId.isValid(value ?? "");
        },
    }).required(),
    updatedName: folderNameValidation
})