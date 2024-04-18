"use client"

import { signIn } from "next-auth/react";
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { ValidationError } from 'yup';
import { EmailPasswordPropsType, EmailPasswordSchema, LoginFlowState } from '../interfaces/index.interface';
import style from "../style.module.scss";
import { getViewSlideClass } from '../utils/index.util';
import ButtonGroup from './buttonGroup';
import InputGroup from './inputGroup';


type Props = EmailPasswordPropsType

const EmailPassword = ({
    title,
    rememberMe = false,
    submitText,
    active,
    onNext,
    index,
    value,
    setState
}: Props) => {

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    } as Record<keyof LoginFlowState, boolean>)

    const handleSubmit = async () => {
        setErrors({} as Record<keyof LoginFlowState, boolean>)
        try {
            await EmailPasswordSchema.validate(value, { abortEarly: false })

            if (value.rememberMe) {
                // TODO: remember me logic
            }

            signIn("credentials", {
                ...value,
                callbackUrl: "/",
                redirect: false
            }).then((res) => {
                console.log(res)
            })
        }
        catch (err: any) {
            const errors = (err as ValidationError).inner;
            errors.forEach(_err => {
                setErrors(prev => {
                    const key = _err?.path;
                    if (!key) return prev;

                    return {
                        ...prev,
                        [key]: _err.message
                    }

                })
            })
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setState(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }))
    }

    const handleNextPage = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onNext && onNext()

    }


    return (
        <div className={`${style.emailPassword} ${style.view} ${getViewSlideClass(active, index)}`}>
            <h4>{title}</h4>
            <InputGroup
                value={value?.email}
                id="email" type='text'
                icon={<i className="bi bi-person-fill"></i>}
                onChange={handleChange}
                errorMessage={errors?.email && "Please enter a valid email" || ""}
                placeHolder='your email' />
            <InputGroup
                value={value?.password}
                type='password'
                id="password"
                icon={<i className="bi bi-lock-fill"></i>}
                onChange={handleChange}
                errorMessage={errors?.password && "Please enter a valid password" || ""}
                placeHolder='your password' />
            {rememberMe && <div className={style.remindPassword}>
                <label htmlFor="checkbox">
                    <input hidden id="checkbox" type="checkbox" onChange={e => setState(prev => ({ ...prev, rememberMe: e.target.checked }))} />
                    <span><i className="bi bi-check2"></i></span>
                    Remember my choice
                </label>
                <Link onClick={handleNextPage} href={"#"}>Forgot Password?</Link>
            </div>}

            <ButtonGroup submitText={submitText} handleSubmit={handleSubmit} />

        </div>
    )
}

export default EmailPassword