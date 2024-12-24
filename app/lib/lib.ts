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
        password = password + pickOneChar + "Mb0&"
    }

    return password
}

export const userInfoProjectionAggregationQuery = () => {
    return {
        $project: {
            firstName: 1,
            lastName: 1,
            email: 1,
            imageUrl: {
                $cond: {
                    if: { $and: [{ $gt: ["$imageUrl", null] }, { $gte: [{ $strLenCP: "$imageUrl" }, 1] }] },
                    then: { $concat: ["/api/users/image/", { $toString: "$_id" }] },
                    else: ""
                }
            }
        }
    }
}
