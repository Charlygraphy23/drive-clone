"use client";

import { PREVIEW_MODAL } from "@/app/_config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getFileIconByType } from "../fileListItem/utils/index.utils";
import ImagePreview from "./components/imagePreview";
import style from "./style.module.scss";




const PreviewFiles = () => {
    const [isLoadingFile, setIsLoadingFile] = useState(true)
    const {
        previewModal,
        data: fileInfo,
    } = useAppSelector((state) => state.modals);
    const dispatch = useAppDispatch()

    const handleClick = useCallback(() => {
        dispatch(toggleModal({
            isOpen: false,
            name: "previewModal"
        }))
    }, [dispatch])

    const toggleFileLoading = useCallback((isLoading = false) => {
        setIsLoadingFile(isLoading)
    }, [])

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

                <i className="bi bi-download"></i>
            </header>
            <main>
                <ImagePreview isLoading={isLoadingFile} toggle={toggleFileLoading} fileId={fileInfo?._id} />
            </main>
        </section>
    )
}

export default PreviewFiles