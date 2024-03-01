
import Logo from "@app/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import style from './style.module.scss'


const GettingStartedHeader = () => {
    return (
        <header className={style.header}>
            <Link href={"/getting-started"}>
                <Image src={Logo} width={50} height={50} alt="Logo" />
            </Link>

            <button className={`button ${style.helpButton}`}>
                Help
            </button>
        </header>
    )
}

export default GettingStartedHeader