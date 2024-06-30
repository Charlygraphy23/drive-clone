"use client";

import { PREVIEW_MODAL } from "@/app/_config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { Progress } from "antd";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFileIconByType } from "../fileListItem/utils/index.utils";
import ImagePreview from "./components/imagePreview";
import OtherPreview from "./components/otherPreview";
import VideoPreview from "./components/videoPreview";
import useDownload from "./hooks/useDownload";
import style from "./style.module.scss";




const PreviewFiles = () => {
    const [isLoadingFile, setIsLoadingFile] = useState(true)
    const {
        previewModal,
        data: fileInfo,
    } = useAppSelector((state) => state.modals);
    const dispatch = useAppDispatch()
    const { startDownload, isDownloading, progress } = useDownload()

    const fileUrl = useMemo(() => {
        if (!fileInfo?._id) return ""
        return `/api/resources/files/${fileInfo?._id}`
    }, [fileInfo])

    const downloadUrl = useMemo(() => {
        if (!fileInfo?._id) return ""
        return `/api/resources/files/download/${fileInfo?._id}`
    }, [fileInfo])
    const isImageFile = useMemo(() => fileInfo?.mimeType && fileInfo?.mimeType?.startsWith?.("image"), [fileInfo])
    const isVideoFile = useMemo(() => fileInfo?.mimeType && fileInfo?.mimeType?.startsWith?.("video"), [fileInfo])


    const handleClick = useCallback(() => {
        dispatch(toggleModal({
            isOpen: false,
            name: "previewModal"
        }))
    }, [dispatch])

    const toggleFileLoading = useCallback((isLoading = false) => {
        setIsLoadingFile(isLoading)
    }, [])

    const handleDownload = () => {
        if (isDownloading) return;
        startDownload(downloadUrl, fileInfo?.name)
    }

    useEffect(() => {
        if (!previewModal) return;

        const handleKeyDown = (e: KeyboardEvent) => {

            const key = e.key
            const keys = ["Escape"]

            if (!keys.includes(key)) {
                return
            }

            if (key === "Escape") {
                handleClick()
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            setIsLoadingFile(true)
        }
    }, [handleClick, previewModal])


    if (!previewModal) return <></>;

    return (
        <section id={PREVIEW_MODAL} className={style.preview}>
            <header>
                <div className={style.info}>
                    <i className="bi bi-arrow-left" onClick={handleClick}></i>
                    <p>
                        <Image
                            className="me-2"
                            src={getFileIconByType(fileInfo?.mimeType)}
                            alt="fileIcon"
                            width={20}
                            height={20}
                            priority
                        />
                        <span>{fileInfo?.name}</span>
                    </p>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    {isDownloading ?
                        <Progress status="active" trailColor="white" type="circle" percent={progress} size={20} strokeColor="#6a29ff" />
                        : <i className="bi bi-download" onClick={handleDownload}></i>
                    }
                </div>
            </header>
            <main>
                {isImageFile && <ImagePreview isLoading={isLoadingFile} toggle={toggleFileLoading} url={fileUrl} />}
                {isVideoFile && <VideoPreview url={fileUrl} />}
                {!isImageFile && !isVideoFile && <OtherPreview url={downloadUrl} fileName={fileInfo?.name} />}
            </main>
        </section>
    )
}

export default PreviewFiles