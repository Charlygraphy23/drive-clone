import ButtonGroup from "../../buttonGroup";
import style from "../style.module.scss";
import { downloadFile } from "../utils/index.utils";


type Props = {
    url: string;
    fileName: string
}

const OtherPreview = ({ url, fileName }: Props) => {

    const onClick = () => {
        downloadFile({ url, fileName })
    }

    return (
        <div className={style.noPreviewWrapper}>
            <p>No Preview Available</p>
            <ButtonGroup submitText="Download" handleSubmit={onClick} />
        </div>
    )
}

export default OtherPreview