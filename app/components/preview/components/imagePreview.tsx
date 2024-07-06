import ImageLoader from "@app/assets/image_loader.json";
import LocalImage from "../../LocalImage";
import LottiePlayer from '../../lottiePlayer';
import style from '../style.module.scss';


type Props = {
    isLoading: boolean,
    toggle: (_isLoading?: boolean) => void,
    url: string
    isOpen?: boolean
}

const ImagePreview = ({ isLoading, toggle, url }: Props) => {
    return (
        <div className={style.imageWrapper}>
            {isLoading && <div style={{ minHeight: "100px" }} className="d-flex align-items-center justify-content-center">
                <LottiePlayer width={80} height={80} animationData={ImageLoader} loop />
            </div>}
            <LocalImage
                style={{
                    objectFit: 'contain',
                }}
                fill
                alt="random"
                src={`${url}`}
                sizes="100vw"
                priority
                onLoad={() => {
                    toggle(false)
                }}
            />
        </div>
    )
}

export default ImagePreview