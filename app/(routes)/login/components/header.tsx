"use client"
import Logo from '@app/assets/logo.png'
import Image from 'next/image'
import style from '../style.module.scss'

const LoginHeader = () => {
    return (
        <div className={style.header}>
            <div>
                <Image src={Logo} alt="logo" width={40} height={40} />
                <h4>MyCloud</h4>
            </div>

        </div>
    )
}

export default LoginHeader