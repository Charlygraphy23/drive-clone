import ButtonGroup from "../../buttonGroup";
import useDownload from "../hooks/useDownload";
import style from "../style.module.scss";


type Props = {
    url: string;
    fileName: string
}

const OtherPreview = ({ url, fileName }: Props) => {
    const { startDownload, isDownloading, progress } = useDownload()
    const onClick = () => {
        if (isDownloading) return;
        startDownload(url, fileName)
    }

    return (
        <div className={style.noPreviewWrapper}>
            <p>No Preview Available</p>
            <ButtonGroup submitText={
                isDownloading ? `${progress}% Downloading..` : "Download"
            } handleSubmit={onClick} />
        </div>
    )
}

export default OtherPreview