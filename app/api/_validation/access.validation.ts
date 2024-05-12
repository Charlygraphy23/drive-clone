import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import mongoose from "mongoose";
import { array, object, string } from "yup";

export const UpdateAccessPayloadValidator = object().shape({
    accessList: array().of(object().shape({
        accessId: string(),
        accessType: string().oneOf([ACCESS_TYPE.READ, ACCESS_TYPE.WRITE]),
        createdFor: string().test({
            name: "valid-mongodb-id",
            message: "Invalid item ID",
            test: (value) => {
                if (value === null || value === undefined) return true
                return mongoose.Types.ObjectId.isValid(value ?? "");

            },
        })
    })),

    resourceId: string().test({
        name: "valid-mongodb-id",
        message: "Invalid item ID",
        test: (value) => {
            if (value === null || value === undefined) return true
            return mongoose.Types.ObjectId.isValid(value ?? "");

        },
    })

})