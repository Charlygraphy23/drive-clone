"use client"

import Lottie from 'react-lottie-player'
import style from "./style.module.scss"

type Props = {
    animationData: object
    width?: number
    height?: number
    loop?: boolean
}

const LottiePlayer = ({ animationData, width = 150, height = 150, loop = false }: Props) => {
    return (
        <div className={style.lottieWrapper}>
            <Lottie
                loop={loop}
                animationData={animationData}
                play
                style={{ width, height }}
            />
        </div>
    )
}

export default LottiePlayer