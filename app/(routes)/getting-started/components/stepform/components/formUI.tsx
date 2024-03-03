"use client"

import InputGroupComponent from '../../inputGroup'
import style from '../style.module.scss'

const StepFormUI = () => {
    return (
        <div className={style.stepFormUI}>
            <span>
                <i className="bi bi-chevron-left"></i>
                Back
            </span>
            <InputGroupComponent className={style.form} />
        </div>
    )
}

export default StepFormUI