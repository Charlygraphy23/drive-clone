import ImageLoader from "@app/assets/image_loader.json";
import { useCallback, useEffect, useRef, useState } from "react";
import LottiePlayer from "../../lottiePlayer";
import style from "../style.module.scss";
import { fetchWithProgress } from "../utils/index.utils";

type Props = {
    url: string;
    isOpen: boolean
}

const TextPreview = ({ url, isOpen }: Props) => {

    const mountOnce = useRef("")
    const [isDownloading, setDownloading] = useState(false)
    const [data, setData] = useState<string | ArrayBuffer | null | undefined>("")



    const fetchFile = useCallback(async () => {
        try {
            setDownloading(true)
            const response = await fetchWithProgress(url);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onload = function (event) {
                setData(event?.target?.result)
                setDownloading(false)
            }
            reader.readAsText(blob);

        } catch (error) {
            console.error('Download failed', error);
            setDownloading(false)
        }
    }, [url])

    useEffect(() => {
        if (mountOnce.current === url) return;

        if (isOpen) fetchFile()
        mountOnce.current = url
    }, [fetchFile, url, isOpen])

    return (
        <section className={style.textWrapper}>

            {isDownloading && <div style={{ minHeight: "100px" }} className="d-flex align-items-center justify-content-center">
                <LottiePlayer width={80} height={80} animationData={ImageLoader} loop />
            </div>}

            {!isDownloading && <pre className={style.container}>
                {String(data)}
            </pre>}
        </section>
    )
}

export default TextPreview