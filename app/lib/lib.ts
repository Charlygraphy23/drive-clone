import { compare } from "bcrypt"

export const comparePasswordWithHash = async (plainPassword: string, hashPassword: string) => {
    return await compare(plainPassword, hashPassword)
}