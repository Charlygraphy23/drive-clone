"use client";

import Logo from '@app/assets/logo.png';
import Image from "next/image";
import { ThreeDots } from 'react-loader-spinner';
import style from "../style.module.scss";

type Props = {
    question?: string;
    answer?: string;

}

const ChatUI = ({ question, answer }: Props) => {
    return (
        <div className={style.chat}>
            <div className={style.sender}>
                <Image src={Logo} alt="brand" width={30} height={30} />
                <p>{question}</p>
            </div>

            <div className={style.receiver}>
                <p>{!answer ? <ThreeDots
                    visible={true}
                    height="20"
                    width="20"
                    color="black"
                    radius="9"
                    ariaLabel="three-dots-loading"
                /> : answer}</p>
                <span>J</span>
            </div>
        </div>
    )
}

export default ChatUI