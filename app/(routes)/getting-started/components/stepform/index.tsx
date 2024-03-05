"use client"

import StepFormChatUI from './components/formChatUI'
import StepFormUI from './components/formUI'
import { StepFormData } from './interfaces/index.interface'
import style from './style.module.scss'

const data = [
    {
        title: "First Name",
        buttonText: "Next",
        dataIndex: "firstName"
    },
    {
        title: "Last Name",
        buttonText: "Next",
        dataIndex: "lastName"
    }
] as StepFormData[]


const StepForm = () => {
    return (
        <div className={style.stepForm}>
            <StepFormUI data={data} />
            <StepFormChatUI />
        </div>
    )
}

export default StepForm