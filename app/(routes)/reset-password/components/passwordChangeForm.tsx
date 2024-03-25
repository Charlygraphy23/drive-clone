"use client"

import ButtonGroup from '@/app/components/loginFlow/components/buttonGroup'
import InputGroup from '@/app/components/loginFlow/components/inputGroup'
import { ChangeEvent, useState } from 'react'
import { ValidationError } from 'yup'
import { PasswordChangeFormErrorStatType, PasswordChangeFormSchema, PasswordChangeFormStateType } from '../interfaces/index.interface'
import style from '../style.module.scss'
import ResetPasswordSuccess from './resetSuccess'


const PasswordChangeForm = () => {

    const [state, setState] = useState<PasswordChangeFormStateType>({
        newPassword: "",
        confirmPassword: ""
    });

    const [resetSuccess, setResetSuccess] = useState(false)

    const [errors, setErrors] = useState<PasswordChangeFormErrorStatType>({
        newPassword: false,
        confirmPassword: false
    });


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }))
    }


    const handleSubmit = async () => {
        setErrors({} as PasswordChangeFormErrorStatType)
        try {
            await PasswordChangeFormSchema.validate(state, { abortEarly: false })
            console.log("Password change")
            setResetSuccess(true)
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

    if (resetSuccess) return <ResetPasswordSuccess />

    return (
        <div className={style.form}>
            <h2 className="text-center">Hey 👋🏾, <strong>Dipta!</strong></h2>
            <span className="text-center mb-5">Reset your password here</span>
            <InputGroup
                className={style.input}
                id="newPassword"
                type='text'
                icon={<i className="bi bi-lock-fill"></i>}
                placeHolder="new password"
                errorMessage={errors?.newPassword && 'Please provide valid new password!' || ""}
                onChange={handleChange}
                value={state.newPassword} />
            <InputGroup
                className={style.input}
                id="confirmPassword"
                type='password'
                icon={<i className="bi bi-lock-fill"></i>}
                placeHolder="confirm password"
                errorMessage={errors?.confirmPassword && 'Please provide valid confirm password!' || ""}
                onChange={handleChange} value={state.confirmPassword} />
            <ButtonGroup submitText='Submit' handleSubmit={handleSubmit} />
        </div>
    )
}

export default PasswordChangeForm