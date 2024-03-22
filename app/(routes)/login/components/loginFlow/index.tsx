import Link from 'next/link'
import InputGroup from './components/inputGroup'
import style from './style.module.scss'


const LoginFlow = () => {
    return (
        <div className={style.loginFlow}>
            <h4>Login</h4>
            <InputGroup type='text' icon={<i className="bi bi-person-fill"></i>} />
            <InputGroup type='password' icon={<i className="bi bi-lock-fill"></i>} />
            <div className={style.remindPassword}>
                <label htmlFor="checkbox">
                    <input hidden id="checkbox" type="checkbox" />
                    <span><i className="bi bi-check2"></i></span>
                    Remember my choice
                </label>
                <Link href={"#"}>Forgot Password?</Link>
            </div>

            <button className="button">
                Login
            </button>


        </div>
    )
}

export default LoginFlow