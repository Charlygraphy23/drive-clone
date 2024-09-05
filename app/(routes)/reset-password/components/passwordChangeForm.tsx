"use client"

import { resetPasswordApi } from '@/app/_apis_routes/user'
import ButtonGroup from '@/app/components/buttonGroup'
import InputGroup from '@/app/components/inputGroup'
import { PasswordChangeFormErrorStatType, PasswordChangeFormSchema, PasswordChangeFormStateType } from '@/app/interfaces/index.interface'
import { ErrorHandler } from '@/app/utils/index.utils'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import style from '../style.module.scss'
import ResetPasswordSuccess from './resetSuccess'

type Props = {
    name: string
    hash: string
}


const PasswordChangeForm = ({ name, hash }: Props) => {
    const mutation = useMutation({ mutationFn: resetPasswordApi })
    const [state, setState] = useState<PasswordChangeFormStateType>({
        newPassword: "",
        confirmPassword: ""
    });

    const [resetSuccess, setResetSuccess] = useState(false)

    const [errors, setErrors] = useState<PasswordChangeFormErrorStatType>({
        newPassword: "",
        confirmPassword: ""
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
            await mutation.mutateAsync({
                newPassword: state.newPassword,
                confirmPassword: state.confirmPassword,
                hash: hash
            })
            setResetSuccess(true)
        }
        catch (err: unknown) {
            const errors = ErrorHandler(err) as Record<string, string>
            if (errors?._validationError) {
                setErrors(errors as PasswordChangeFormErrorStatType)
            }
            console.error(err)

        }

    }

    if (resetSuccess) return <ResetPasswordSuccess />

    return (
        <div className={style.form}>
            <h2 className="text-center">Hey 👋🏾, <strong>{name}!</strong></h2>
            <span className="text-center mb-5">Reset your password here</span>
            <InputGroup
                className={style.input}
                id="newPassword"
                type='text'
                icon={<i className="bi bi-lock-fill"></i>}
                placeHolder="new password"
                errorMessage={errors?.newPassword || ""}
                onChange={handleChange}
                value={state.newPassword}
                disabled={mutation?.isPending} />
            <InputGroup
                className={style.input}
                id="confirmPassword"
                type='password'
                icon={<i className="bi bi-lock-fill"></i>}
                placeHolder="confirm password"
                errorMessage={errors?.confirmPassword || ""}
                onChange={handleChange} value={state.confirmPassword}
                disabled={mutation?.isPending}
            />
            <ButtonGroup submitText='Submit' handleSubmit={handleSubmit} disabled={mutation?.isPending} loading={mutation?.isPending} />
        </div>
    )
}

export default PasswordChangeForm