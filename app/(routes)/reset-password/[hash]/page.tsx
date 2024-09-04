import { CryptoHandler, JWTHandler } from '@/app/lib/database/helper/user.helper'
import { redirect } from 'next/navigation'
import LoginHeader from '../../login/components/header'
import PasswordChangeForm from '../components/passwordChangeForm'
import style from '../style.module.scss'

const index = (props: {
    params: { hash: string }
}) => {

    const hash = props?.params?.hash;


    if (!hash) return redirect("/");

    try {
        const decryptedText = CryptoHandler.decrypt(hash);
        console.log("decryptedText", decryptedText)

        if (!decryptedText) throw "No decryptedText!"

        const isValid = JWTHandler.verify<{
            userId: string;
            email: string;
        } | boolean>(decryptedText)

        if (!isValid) throw "Not valid token!"
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
                    <PasswordChangeForm />
                </div>
            </div>

        </div>
    )
}

export default index