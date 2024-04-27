"use client"

import PartyPopperImg from "@app/assets/party-popper.svg"
import Image from 'next/image'
import { useContext } from "react"
import { GetStartedContext } from "../../../store"
import style from '../style.module.scss'

const FinishPageUI = () => {

    const { setPage, resetData } = useContext(GetStartedContext);

    const handleClick = () => {
        setPage(-1)
        resetData()
    }

    return (
        <div className={style.finishPage}>
            <Image src={PartyPopperImg} alt="PartyPopperImg" width={30} height={30} />
            <p>A email has been sent to your registered email address !</p>
            <button className="button" onClick={handleClick}>Back to Home</button>
        </div>
    )
}

export default FinishPageUI