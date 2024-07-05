import { useEffect, useRef, useState } from "react"
import videojs from "video.js"
import Player from "video.js/dist/types/player"
import style from "../style.module.scss"

type Props = {
    url: string
}

const VideoPreview = ({ url }: Props) => {

    const ref = useRef<HTMLVideoElement>(null);
    const [player, setPlayer] = useState<Player | null>(null)


    useEffect(() => {
        if (!url) return;

        if (!ref.current) return;

        const player = videojs(ref.current, {
            autoplay: true,
            controls: true,
            fluid: true
        });

        setPlayer(player)
    }, [url])

    return (
        <section className={style.videoWrapper}>
            <video ref={ref} className="video-js" preload="auto" src={url}>
            </video>
        </section>
    )
}

export default VideoPreview