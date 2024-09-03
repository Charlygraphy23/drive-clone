import crypto from 'crypto';
import jwt from "jsonwebtoken";

const key = crypto
    .createHash('sha512')
    .update(process.env.CRYPTO_KEY)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(process.env.CRYPTO_IV)
    .digest('hex')
    .substring(0, 16)

export const JWTHandler = {
    sign: (payload: Record<string, string>, expiresInSeconds = 60) => {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresInSeconds
        });
    }
}



export const CryptoHandler = {
    encrypt: (text: string) => {
        const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIV)
        return Buffer.from(
            cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64')
    },
    decrypt: (encryptedText: string) => {
        const buff = Buffer.from(encryptedText, 'base64')
        const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIV)
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        )
    }
}