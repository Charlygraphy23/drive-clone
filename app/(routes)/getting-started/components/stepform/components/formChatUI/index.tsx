"use client";
import Logo from "@app/assets/logo.png";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { GetStartedContext } from "../../../../store";
import DoodleUiContainer from "../../../doodleUiContainer";
import { ChatUIStateType, StepFormData } from "../../interfaces/index.interface";
import ChatUI from "./components/chatUI";
import style from "./style.module.scss";

type Props = {
    data: StepFormData[]
}

const StepFormChatUI = ({ data }: Props) => {

    const { state: contextState } = useContext(GetStartedContext);
    const activePageRef = useRef<number>(-1);
    const [state, setState] = useState<ChatUIStateType>([] as ChatUIStateType);

    useEffect(() => {
        if (!data) return;
        if (activePageRef.current >= contextState.activePage) return;

        setState(prev => [...prev, {
            question: data?.[contextState.activePage]?.botQuestion,
            key: data?.[contextState.activePage]?.dataIndex
        }])

        activePageRef.current = contextState.activePage

    }, [activePageRef, contextState?.activePage, data])

    return (
        <div className={style.chatUI}>
            <div className={style.chatWrapper}>
                <DoodleUiContainer className={style.chatContainer} >
                    {state.map((val) => <ChatUI key={val?.key} question={val.question} answer={contextState?.data?.[val?.key]} />)}
                </DoodleUiContainer>
                <Image className={style.chatImage} src={Logo} alt="Logo" width={40} height={40} />
            </div>
        </div>

    )
}

export default StepFormChatUI