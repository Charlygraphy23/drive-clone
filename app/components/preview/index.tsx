"use client";

import { PREVIEW_MODAL } from "@/app/_config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { Progress } from "antd";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { getFileIconByType } from "../fileListItem/utils/index.utils";
import ImagePreview from "./components/imagePreview";
import OtherPreview from "./components/otherPreview";
import TextPreview from "./components/txtPreview";
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
    const [isMounted, setMounted] = useState(true)

    const fileUrl = useMemo(() => {
        if (!fileInfo?._id) return ""
        return `/api/resources/files/${fileInfo?._id}`
    }, [fileInfo])

    const downloadUrl = useMemo(() => {
        if (!fileInfo?._id) return ""
        return `/api/resources/files/download/${fileInfo?._id}`
    }, [fileInfo])

    const handleClick = useCallback(() => {
        flushSync(() => {
            setMounted(false)
        })
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

    const Component = useCallback(() => {

        const isImage = fileInfo?.mimeType?.startsWith?.("image")
        const isVideo = fileInfo?.mimeType?.startsWith?.("video")
        const isText = fileInfo?.mimeType?.startsWith?.("text") || fileInfo?.mimeType?.startsWith?.("application/json")
        console.log("fileInfo?.mimeType", fileInfo?.mimeType)

        if (isImage) {
            return <ImagePreview isOpen={isMounted} isLoading={isLoadingFile} toggle={toggleFileLoading} url={fileUrl} />
        }

        if (isVideo) {
            return <VideoPreview isOpen={isMounted} url={fileUrl} />
        }

        if (isText) {
            return <TextPreview url={downloadUrl} isOpen={isMounted} />
        }


        return <OtherPreview url={downloadUrl} fileName={fileInfo?.name} />
    }, [downloadUrl, fileInfo?.mimeType, fileInfo?.name, fileUrl, isLoadingFile, isMounted, toggleFileLoading])

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
                <Component />
            </main>
        </section>
    )
}

export default PreviewFiles