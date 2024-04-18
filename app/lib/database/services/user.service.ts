import { UserSchemaType } from "../interfaces/user.interface";
import { UserModel } from "../models/user";

export class UserService {
    async findByEmail(email: string, select: string | Partial<Record<keyof UserSchemaType, number>> = "") {
        return await UserModel.findOne({ email }).select(select)
    }

}