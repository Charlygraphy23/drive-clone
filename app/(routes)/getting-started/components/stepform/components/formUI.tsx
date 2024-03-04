"use client"

import { useState } from 'react'
import InputGroupComponent from '../../inputGroup'
import { StepFormData } from '../interfaces/index.interface'
import style from '../style.module.scss'

type Props = {
    data: StepFormData[]
}

const StepFormUI = ({ data }: Props) => {
    const [state, setState] = useState(data?.map((value) => ({
        ...value,
        value: "",
    })))

    const [activeIndex, setActiveIndex] = useState(0)

    const onChange = () => {

    }

    const onSubmit = () => {

    }

    return (
        <div className={style.stepFormUIWrapper}>
            {state && state?.map((value, index) => <div key={index} className={style.stepFormUI}>
                <span>
                    <i className="bi bi-chevron-left"></i>
                    Back
                </span>
                <InputGroupComponent
                    className={style.form}
                    value={value.value}
                    buttonText={value.buttonText}
                    submit={onSubmit}
                    onChange={onChange}
                    title={value.title}
                />
            </div>)}
        </div>
    )
}

export default StepFormUI