"use client"

import { ALERT_MODAL } from "@/app/_config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    disableAlert
} from "@/app/store/actions";
import { ALERT_MODAL_TYPE } from "@/app/store/reducers/alert.reducer";
import { useCallback } from "react";
import ButtonGroup from "../buttonGroup";
import ModalComponent from "../modal/index";
import style from './style.module.scss';


const AlertModal = () => {
    const dispatch = useAppDispatch();
    const { isOpen, message, type } = useAppSelector(state => state.alertState)

    const toggleModal = useCallback(() => {
        dispatch(disableAlert());
    }, [dispatch]);

    const handleClick = useCallback(() => {
        dispatch(disableAlert());
    }, [dispatch])

    return (
        <ModalComponent id={ALERT_MODAL} isOpen={isOpen} toggleHandler={toggleModal}>
            <div className={style.alert}>
                <div className={`${style.icon} ${type}`}>
                    {type === ALERT_MODAL_TYPE.SUCCESS && <i className="bi bi-check-lg"></i>}
                    {type === ALERT_MODAL_TYPE.ERROR && <i className="bi bi-exclamation-lg"></i>}
                    {type === ALERT_MODAL_TYPE.WARNING && <i className="bi bi-exclamation-triangle"></i>}
                </div>

                <p>
                    {message}
                </p>

                <ButtonGroup submitText={type === ALERT_MODAL_TYPE.SUCCESS ? "OK" : type === ALERT_MODAL_TYPE.ERROR ? "Try again" : "Understood"} handleSubmit={handleClick} />
            </div>
        </ModalComponent>
    )
}

export default AlertModal