import { ChangeEvent, useState } from 'react'
import { ValidationError } from 'yup'
import { ForgotPasswordPropsType, ForgotPasswordSchema, LoginFlowState } from '../interfaces/index.interface'
import style from '../style.module.scss'
import { getViewSlideClass } from '../utils/index.util'
import ButtonGroup from './buttonGroup'
import InputGroup from './inputGroup'

type Props = ForgotPasswordPropsType

const ForgotPassword = ({
    title,
    submitText,
    active,
    onNext,
    index,
    goBack,
    value,
    setState
}: Props) => {

    const [errors, setErrors] = useState({
        email: false,
    } as Record<keyof LoginFlowState, boolean>)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setState(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }))
    }

    const handleSubmit = async () => {
        setErrors({} as Record<keyof LoginFlowState, boolean>)
        try {
            await ForgotPasswordSchema.validate(value, { abortEarly: false })
            onNext && onNext()

            // TODO: redirect to success page
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

    const handleBack = () => {
        goBack()
    }


    return (
        <div className={`${style.view} ${getViewSlideClass(active, index)}`}>
            <div className="d-flex align-items-center w-100">
                <i onClick={handleBack} className="bi bi-chevron-left" style={{ cursor: "pointer" }}></i>
                <h4 className="flex-fill text-center">{title}</h4>
            </div>
            <InputGroup
                id='email'
                className={errors?.email && style.error || ""}
                type='email'
                icon={<i className="bi bi-envelope-fill"></i>}
                value={value?.email}
                errorMessage={errors?.email && "Please enter a valid email" || ""}
                onChange={handleChange}
            />
            <ButtonGroup submitText={submitText} handleSubmit={handleSubmit} />

        </div>
    )
}

export default ForgotPassword