"use client"
import Logo from '@app/assets/logo.png'
import Image from 'next/image'
import style from '../style.module.scss'

const LoginHeader = () => {
    return (
        <div className={style.header}>
            <div>
                <Image src={Logo} alt="mbox" width={50} height={50} />
            </div>

        </div>
    )
}

export default LoginHeader