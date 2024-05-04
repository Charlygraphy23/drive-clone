"use client"

import ButtonGroup from "@/app/components/buttonGroup"
import { useRouter } from "next/navigation"
import style from '../style.module.scss'

const ResetPasswordSuccess = () => {
    const router = useRouter()

    const handleClick = async () => {
        router.replace("/login")
    }

    return (
        <div className={style.resetSuccess}>
            <h4>🔐 Password Reset Success! 🎉</h4>
            <p>
                🎉 Your password reset was successful! You&apos;re all set to dive back in. 🚀 If you need further assistance, we&apos;re here to help. Stay secure and enjoy your day! 😊
            </p>

            <ButtonGroup submitText="Back to login" handleSubmit={handleClick} />

        </div>
    )
}

export default ResetPasswordSuccess