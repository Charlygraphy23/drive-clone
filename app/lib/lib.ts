import { compare } from "bcryptjs"

const passwordTypes = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "@$!%*?&]=^}"
]

export const comparePasswordWithHash = async (plainPassword: string, hashPassword: string) => {
    return await compare(plainPassword, hashPassword)
}


export const generatePassword = async (length: number = 8) => {
    let password: string = ""

    while (password.length <= length) {
        const pickIndex = Math.floor(Math.random() * passwordTypes.length)
        const str = passwordTypes[pickIndex]
        const pickOneChar = str.charAt(Math.floor(Math.random() * str.length))
        password = password + pickOneChar
    }

    return password
}
