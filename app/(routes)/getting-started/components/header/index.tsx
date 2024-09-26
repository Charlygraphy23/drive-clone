"use client"

import Logo from "@app/assets/logo.png"
import { User } from "next-auth"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import style from './style.module.scss'

type Props = {
    user?: User;
}


const GettingStartedHeader = ({ user }: Props) => {

    const router = useRouter();

    return (
        <header className={style.header}>
            <Link href={"/getting-started"}>
                <Image src={Logo} width={50} height={50} alt="mbox" />
            </Link>



            {!user
                && <button className={`button ${style.helpButton}`} onClick={() => router.push("/login")}>
                    Log in
                </button>}
        </header>
    )
}

export default GettingStartedHeader