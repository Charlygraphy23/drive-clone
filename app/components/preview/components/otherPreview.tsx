import ButtonGroup from "../../buttonGroup";
import style from "../style.module.scss";


type Props = {
    url: string;
    fileName: string
}

const OtherPreview = ({ url, fileName }: Props) => {

    const onClick = () => {
        if (!url) return;

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = fileName
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
    }

    return (
        <div className={style.noPreviewWrapper}>
            <p>No Preview Available</p>
            <ButtonGroup submitText="Download" handleSubmit={onClick} />
        </div>
    )
}

export default OtherPreview