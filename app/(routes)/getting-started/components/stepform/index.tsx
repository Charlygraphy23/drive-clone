"use client"

import { useContext } from 'react'
import { GetStartedContext } from '../../store'
import FinishPageUI from './components/finishPage'
import StepFormChatUI from './components/formChatUI'
import StepFormUI from './components/formUI'
import { StepFormData } from './interfaces/index.interface'
import style from './style.module.scss'

const data = [
    {
        title: "First Name",
        buttonText: "Next",
        dataIndex: "firstName",
        botQuestion: "Your first name?"
    },
    {
        title: "Last Name",
        buttonText: "Next",
        dataIndex: "lastName",
        botQuestion: "Your last name?"
    }
] as StepFormData[]


const StepForm = () => {

    const { state } = useContext(GetStartedContext);


    if (state.activePage === data.length) {
        return <div className={style.stepForm}>
            <FinishPageUI />
        </div>
    }

    return (
        <div className={style.stepForm}>
            <StepFormUI data={data} />
            <StepFormChatUI data={data} />
        </div>
    )
}

export default StepForm