import { EffectiveConnectionType } from "@/app/interfaces/index.interface";
import { useAppDispatch } from "@/app/store";
import { addNetworkQuality } from "@/app/store/actions/network.actions";
import { getImageQuality } from "@/app/utils/index.utils";
import ImageLoader from "@app/assets/image_loader.json";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import LocalImage from "../../LocalImage";
import LottiePlayer from '../../lottiePlayer';
import style from '../style.module.scss';


type Props = {
    isLoading: boolean,
    toggle: (_isLoading?: boolean) => void,
    url: string
    isOpen?: boolean
}

const ImagePreview = ({ isLoading, toggle, url, isOpen }: Props) => {

    const { isFetched, data } = useQuery({ queryFn: getImageQuality, queryKey: ["network"], refetchOnWindowFocus: true, staleTime: 1000 * 15 })
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (isFetched && data && isOpen) {
            dispatch(addNetworkQuality(data as EffectiveConnectionType))
        }
    }, [isFetched, data, dispatch, isOpen])


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