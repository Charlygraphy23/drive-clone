import authConfig from '@/app/lib/authConfig'
import LoginIllustration from '@app/assets/login-illustration.svg'
import { Session, getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import LoginFlow from '../../components/loginFlow'
import LoginHeader from './components/header'
import style from './style.module.scss'


const LoginPage = async () => {
    const session = await getServerSession<any, Session>(authConfig)

    if (session) return redirect("/")

    return (
        <section className={style.loginPage}>
            <div className={style.container}>
                <LoginHeader />
                <div className={style.flowWrapper}>
                    <LoginFlow />
                    <Image src={LoginIllustration} alt='LoginIllustration' />
                </div>
            </div>
        </section>
    )
}

export default LoginPage