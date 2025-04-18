import { ChangeEvent, ReactElement, Ref, forwardRef } from 'react';
import style from './style.module.scss';


type Props = {
    icon?: ReactElement;
    type: 'text' | "email" | "password";
    value?: string;
    onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    errorMessage?: string;
    id?: string;
    placeHolder?: string;
    name?: string
    disabled?: boolean;
}

const InputGroup = ({ icon, type, value = "", onChange, className = "", errorMessage = "", id, placeHolder, name, disabled = false }: Props, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={style.inputGroup}>
            {errorMessage && <div className={style.errorMessage}>
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{errorMessage ?? "Something went wrong!!"}</span>
            </div>}
            <div className={`${className} ${style.inputGroupWrapper} ${errorMessage && style.error || ""}`}>
                {icon && <span>{icon}</span>}
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeHolder}
                    ref={ref}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default forwardRef(InputGroup)