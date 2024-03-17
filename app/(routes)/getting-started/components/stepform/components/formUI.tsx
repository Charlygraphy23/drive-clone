"use client"

import { useContext, useState } from 'react'
import { GetStartedContext } from '../../../store'
import InputGroupComponent from '../../inputGroup'
import { SubmitParameterValueType } from '../../inputGroup/interfaces/index.interface'
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
    const { state: { activePage }, setPage } = useContext(GetStartedContext)

    const onBackEvent = () => {
        if (activePage === -1) setPage(-1);
        setPage(activePage - 1)
    }

    const onSubmit = (key: string, value: SubmitParameterValueType) => {
        setPage(activePage + 1)
        setState(prev => ({
            ...prev,
            [key]: value
        }))

    }


    return (
        <div className={style.stepFormUIContainer}>
            <div className={style.stepFormUIWrapper}>
                {data?.map((value, index) => <div
                    style={{ top: activePage < index ? "100%" : activePage !== index ? "-100%" : "0" }}
                    key={value.dataIndex}
                    className={`${style.stepFormUI} ${activePage === index && style.active}`}>
                    <p onClick={onBackEvent}>
                        <i className="bi bi-chevron-left"></i>
                        Back
                    </p>
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