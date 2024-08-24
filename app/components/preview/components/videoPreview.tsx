import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import 'video.js/dist/video-js.css';
import style from "../style.module.scss";

type Props = {
    url: string
    isOpen: boolean
}

const VideoPreview = ({ url, isOpen }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<Player | null>();
    const mountOnce = useRef("")

    useEffect(() => {
        console.log("UL==> VIDEO mouted")
        if (!url) return;
        if (!videoRef.current) return;

        // if (mountOnce?.current === url) return;

        if (playerRef.current) {
            playerRef.current.src(url)
        }
        else {
            const player = videojs(videoRef.current, {
                autoplay: false,
                controls: true,
                sources: [
                    {
                        src: url,
                        type: 'video/mp4'
                    }
                ]
            }, () => {
                videojs.log('player is ready');
            });

            playerRef.current = player
            mountOnce.current = url

            console.log('player is ready', playerRef.current)
        }




        return () => {
            console.log("UL==>  PLAYER", playerRef.current)
            // console.log("UL==>  player.isDisposed()", playerRef.current.isDisposed())
            console.log("UL==>  isOpen", isOpen)


            if (playerRef.current && !playerRef.current.isDisposed() && !isOpen) {
                console.log('UL==> Called Dispose ',)
                playerRef.current.dispose();
                playerRef.current = null;
                console.log('UL==> player is unmounted')

            }
        }

    }, [url, isOpen])

    return (
        <section className={style.videoWrapper}>
            <video ref={videoRef} className="video-js vjs-big-play-centered" preload="auto">
            </video>
        </section>
    )
}

export default VideoPreview