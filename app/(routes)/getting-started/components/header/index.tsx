"use client"

import Logo from "@app/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import style from './style.module.scss'


const GettingStartedHeader = () => {

    const router = useRouter();

    return (
        <header className={style.header}>
            <Link href={"/getting-started"}>
                <Image src={Logo} width={50} height={50} alt="Logo" />
            </Link>

            <button className={`button ${style.helpButton}`} onClick={() => router.push("/login")}>
                Log in
            </button>
        </header>
    )
}

export default GettingStartedHeader