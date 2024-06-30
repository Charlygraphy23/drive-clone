import style from "../style.module.scss"

type Props = {
    url: string
}

const VideoPreview = ({ url }: Props) => {
    return (
        <section className={style.videoWrapper}>
            <video src={url}></video>
        </section>
    )
}

export default VideoPreview