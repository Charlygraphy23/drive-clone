import ImageLoader from "@app/assets/image_loader.json";
import Image from 'next/image';
import LottiePlayer from '../../lottiePlayer';
import style from '../style.module.scss';


type Props = {
    isLoading: boolean,
    toggle: (_isLoading?: boolean) => void,
    fileId: string
}

const ImagePreview = ({ isLoading, toggle, fileId }: Props) => {
    return (
        <div className={style.imageWrapper}>
            {isLoading && <div style={{ minHeight: "100px" }} className="d-flex align-items-center justify-content-center">
                <LottiePlayer width={80} height={80} animationData={ImageLoader} loop />
            </div>}
            <Image
                style={{
                    objectFit: 'contain',
                }}
                fill
                alt="random"
                src={`/api/resources/files/${fileId}`}
                sizes="100vw"
                priority
                onLoadingComplete={() => {
                    toggle(false)
                }}
            />
        </div>
    )
}

export default ImagePreview