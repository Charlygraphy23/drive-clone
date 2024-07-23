import { ErrorHandler } from '@/app/utils/index.utils'
import { ChangeEvent, useState } from 'react'
import ButtonGroup from '../../buttonGroup'
import InputGroup from '../../inputGroup'
import { ForgotPasswordPropsType, ForgotPasswordSchema } from '../interfaces/index.interface'
import style from '../style.module.scss'
import { getViewSlideClass } from '../utils/index.util'

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
        email: "",
    })


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async () => {
        setErrors({ email: "" })
        try {
            await ForgotPasswordSchema.validate(value, { abortEarly: false })
            onNext && onNext()

            // TODO forget password logic with API
            // TODO: redirect to success page
        }
        catch (err: any) {
            const errors = ErrorHandler(err) as { email: string } & Record<string, string>
            if (errors?._validationError) {
                setErrors(errors)
            }
            console.error(err)
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
                name='email'
                className={errors?.email && style.error || ""}
                type='email'
                icon={<i className="bi bi-envelope-fill"></i>}
                value={value?.email}
                errorMessage={errors?.email}
                onChange={handleChange}
            />
            <ButtonGroup submitText={submitText} handleSubmit={handleSubmit} />

        </div>
    )
}

export default ForgotPassword