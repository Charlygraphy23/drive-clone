import crypto from 'node:crypto';

const encryptText = (plaintext: string) => {
    const key = crypto.randomBytes(32).toString('base64');
    const iv = crypto.randomBytes(12).toString('base64');
    const cipher = crypto.createCipheriv(
        "aes-256-gcm",
        Buffer.from(key, 'base64'),
        Buffer.from(iv, 'base64')
    );
    let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    const tag = cipher.getAuthTag().toString("base64")

    const text = `${ciphertext}-${tag}-${iv}-${key}`
    return text
}


const decryptText = (encryptedText: string) => {

    const [ciphertext, tag, iv, key] = encryptedText.split("-")

    const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        Buffer.from(key, 'base64'),
        Buffer.from(iv, 'base64')
    );

    decipher.setAuthTag(Buffer.from(tag, 'base64'));

    let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
    plaintext += decipher.final('utf8');

    return plaintext;
}


export const CRYPTO = {
    encrypt: (plaintext: string) => encryptText(plaintext),
    decrypt: (encryptedText: string) => decryptText(encryptedText),
    encryptWithBase64: (plaintext: string) => {
        const encryptedText = encryptText(plaintext);
        return Buffer.from(encryptedText, "utf8").toString('base64')
    },
    decryptTextFromBase64: (bas64String: string) => {
        const encryptedText = Buffer.from(bas64String, 'base64').toString('ascii')
        const decryptedString = decryptText(encryptedText);
        return decryptedString
    }
}


