import { connectDB } from '@/app/lib/database/db'
import { CryptoHandler, JWTHandler } from '@/app/lib/database/helper/user.helper'
import { ResetTokenService } from '@/app/lib/database/services/resetToken.service'
import { redirect } from 'next/navigation'
import LoginHeader from '../../login/components/header'
import PasswordChangeForm from '../components/passwordChangeForm'
import style from '../style.module.scss'


const isThisActiveHash = async (userId: string) => {
    try {
        await connectDB();
        const resetTokenService = new ResetTokenService();
        const token = await resetTokenService.getByUserId(userId)
        return token?.isActive ?? false
    }
    catch (error: any) {
        console.log("Error from isThisActiveHash", error)
    }
    return false
}

const index = async (props: {
    params: { hash: string }
}) => {
    const hash = props?.params?.hash;

    if (!hash) return redirect("/");

    const decodedString = decodeURIComponent(hash)
    let name = ""

    try {
        const decryptedText = CryptoHandler.decrypt(decodedString);

        if (!decryptedText) throw "No decryptedText!"

        const isValid = JWTHandler.verify<{
            userId: string;
            email: string;
            firstName: string
        } | boolean>(decryptedText)

        if (!isValid) throw "Not valid token!"

        const isActive = await isThisActiveHash(isValid?.userId);
        if (!isActive) {
            throw "Session Expired!"
        }

        name = isValid?.firstName
    }
    catch (error) {
        console.error(error);
        return redirect("/");
    }

    return (
        <div className={style.resetPassword}>
            <div className={style.container}>
                <LoginHeader />

                <div className={style.wrapper}>
                    <PasswordChangeForm name={name ?? "Buddy"} hash={hash} />
                </div>
            </div>

        </div>
    )
}

export default index;
