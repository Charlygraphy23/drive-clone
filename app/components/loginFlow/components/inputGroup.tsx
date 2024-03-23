import { ChangeEvent, ReactElement } from 'react';
import style from '../style.module.scss';


type Props = {
    icon: ReactElement;
    type: 'text' | "email" | "password";
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    errorMessage?: string;
}

const InputGroup = ({ icon, type, value = "", onChange, className = "", errorMessage = "" }: Props) => {
    return (
        <div className={style.inputGroup}>
            {errorMessage && <div className={style.errorMessage}>
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{errorMessage ?? "Something went wrong!!"}</span>
            </div>}
            <div className={`${className} ${style.inputGroupWrapper}`}>
                <span>{icon}</span>
                <input type={type} value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default InputGroup