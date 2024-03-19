"use client"

import { useContext } from 'react'
import { GetStartedContext } from '../../../store'
import InputGroupComponent from '../../inputGroup'
import { StepFormData } from '../interfaces/index.interface'
import style from '../style.module.scss'

type Props = {
    data: StepFormData[]
}

const StepFormUI = ({ data }: Props) => {
    const { state: { activePage }, setPage } = useContext(GetStartedContext)

    const onBackEvent = () => {
        if (activePage === -1) setPage(-1);
        setPage(activePage - 1)
    }

    const onSubmit = () => {
        setPage(activePage + 1)
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
                        onSubmit={onSubmit}
                        title={value.title}
                        id={value.dataIndex}
                    />
                </div>)}
            </div>
        </div>
    )
}

export default StepFormUI