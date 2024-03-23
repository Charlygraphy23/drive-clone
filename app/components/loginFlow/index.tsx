import Link from 'next/link';
import InputGroup from './components/inputGroup';
import style from './style.module.scss';


type Props = {
    title: string;
    rememberMe?: boolean;
    submitText: string;
}

// TODO: need to add a wrapper to make a slide animation work!!
// TODO: wrapper will be positioned relative and will have a min-width of 450px (needs to handled by mobile devices)
const LoginFlow = ({
    title,
    rememberMe = false,
    submitText
}: Props) => {
    return (

        // TODO: this class then will be positioned absolute 
        // TODO: below code will be in a separate component
        // TODO: This current component will handle the logic to show & hide the form layout!!
        <div className={style.loginFlow}>
            <h4>{title}</h4>
            <InputGroup className={style.error} type='text' icon={<i className="bi bi-person-fill"></i>} />
            <InputGroup type='password' icon={<i className="bi bi-lock-fill"></i>} />
            {rememberMe && <div className={style.remindPassword}>
                <label htmlFor="checkbox">
                    <input hidden id="checkbox" type="checkbox" />
                    <span><i className="bi bi-check2"></i></span>
                    Remember my choice
                </label>
                <Link href={"#"}>Forgot Password?</Link>
            </div>}

            <button className="button">
                {submitText}
            </button>
        </div>
    )
}

export default LoginFlow