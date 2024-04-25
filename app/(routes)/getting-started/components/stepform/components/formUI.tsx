"use client"

import { signupApi } from '@/app/_apis_routes/user'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { GetStartedContext } from '../../../store'
import InputGroupComponent from '../../inputGroup'
import { StepFormData } from '../interfaces/index.interface'
import style from '../style.module.scss'

type Props = {
    data: StepFormData[]
}

const StepFormUI = ({ data }: Props) => {
    const { state: { activePage, data: formData }, setPage } = useContext(GetStartedContext)
    const { mutateAsync } = useMutation({ mutationFn: signupApi })

    const onBackEvent = () => {
        if (activePage === -1) setPage(-1);
        setPage(activePage - 1)
    }

    const onSubmit = async () => {

        if (activePage + 1 === data.length) {
            throw new Error("Invalid!!")
            await mutateAsync({
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName
            })
        }
        else {
            setPage(activePage + 1)
        }
        // TODO: place api call
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