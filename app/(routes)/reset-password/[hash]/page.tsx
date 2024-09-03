import LoginHeader from '../../login/components/header'
import PasswordChangeForm from '../components/passwordChangeForm'
import style from '../style.module.scss'

const index = () => {
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