"use client"

import { useState } from 'react'
import InputGroupComponent from '../../inputGroup'
import { StepFormData } from '../interfaces/index.interface'
import style from '../style.module.scss'

type Props = {
    data: StepFormData[]
}

const getInitialValues = (data: StepFormData[]) => {
    return data?.reduce((prev, curr) => {
        prev[curr.dataIndex] = ""
        return prev
    }, {} as Record<string, any>)
}

const StepFormUI = ({ data }: Props) => {
    const [state, setState] = useState(getInitialValues(data))
    const [activeIndex, setActiveIndex] = useState(0)

    const onBackEvent = () => {
        setActiveIndex(prev => {
            if (prev === 0) return 0;
            return --prev
        })
    }

    const onSubmit = (key: string, value: string) => {
        setActiveIndex(prev => {
            if (prev >= data.length - 1) return prev;
            return ++prev
        })

        setState(prev => ({
            ...prev,
            [key]: value
        }))

    }


    return (
        <div className={style.stepFormUIContainer}>
            <div className={style.stepFormUIWrapper}>
                {data?.map((value, index) => <div style={{ top: activeIndex < index ? "100%" : activeIndex !== index ? "-100%" : "0" }} key={value.dataIndex} className={`${style.stepFormUI} ${activeIndex === index && style.active}`}>
                    <span onClick={onBackEvent}>
                        <i className="bi bi-chevron-left"></i>
                        Back
                    </span>
                    <InputGroupComponent
                        className={style.form}
                        buttonText={value.buttonText}
                        submit={onSubmit}
                        title={value.title}
                        id={value.dataIndex}
                    />
                </div>)}
            </div>
        </div>
    )
}

export default StepFormUI