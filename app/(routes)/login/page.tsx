import LoginIllustration from '@app/assets/login-illustration.svg'
import Image from 'next/image'
import LoginFlow from '../../components/loginFlow'
import LoginHeader from './components/header'
import style from './style.module.scss'


const LoginPage = () => {
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