import { ChangeEvent, ReactElement } from 'react';
import style from '../style.module.scss';


type Props = {
    icon: ReactElement;
    type: 'text' | "email" | "password";
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputGroup = ({ icon, type, value = "", onChange }: Props) => {
    return (
        <div className={style.inputGroup}>
            <span>{icon}</span>
            <input type={type} value={value} onChange={onChange} />
        </div>
    )
}

export default InputGroup