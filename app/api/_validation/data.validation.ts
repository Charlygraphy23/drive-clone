import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import mongoose from "mongoose";
import { object, string } from "yup";

export const DataCreateSchemaValidator = object().shape({
    createdBy: string().test({
        name: "valid-mongodb-id",
        message: "Invalid item ID",
        test: (value) => {
            return mongoose.Types.ObjectId.isValid(value ?? "");
        },
    }).required(),
    name: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required(),
    type: string().oneOf([DATA_TYPE.FILE, DATA_TYPE.FOLDER]).required(),
    // parentFolderId: string().test({
    //     name: "valid-mongodb-id",
    //     message: "Invalid item ID",
    //     test: (value) => {
    //         console.log("value", value)
    //         if (value === null || value === undefined) return true
    //         return mongoose.Types.ObjectId.isValid(value ?? "");
    //     },
    // })
})