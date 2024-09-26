"use client"

import Logo from "@app/assets/logo.png"
import { User } from "next-auth"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import style from './style.module.scss'

type Props = {
    user?: User;
    className?: string;
    hideContactUs?: boolean
    hidePrice?: boolean

}


const GettingStartedHeader = ({ user, className, hideContactUs, hidePrice }: Props) => {

    const router = useRouter();

    return (
        <header className={`${style.header} ${className}`}>
            <Link href={"/getting-started"}>
                <Image src={Logo} width={50} height={50} alt="mbox" />
            </Link>


            <div className={style.linkGroups}>
                {!user && !hidePrice && <Link href="/plans">Prices</Link>}
                {!hideContactUs && <Link href="/contact-us">Contact Us</Link>}
                {!user
                    && <button className={`button ${style.helpButton}`} onClick={() => router.push("/login")}>
                        Log in
                    </button>}
            </div>
        </header>
    )
}

export default GettingStartedHeader