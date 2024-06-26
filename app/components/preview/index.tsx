"use client";

import { PREVIEW_MODAL } from "@/app/_config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { getFileIconByType } from "../fileListItem/utils/index.utils";
import style from "./style.module.scss";




const PreviewFiles = () => {
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
                <div className={style.imageWrapper}>
                    <Image
                        onLoad={(e) => console.log(e.target)}
                        style={{
                            objectFit: 'contain',

                        }}
                        fill
                        alt="random"
                        src={`/api/resources/files/${fileInfo?._id}`}
                        sizes="100vw"
                        priority
                    />
                </div>
            </main>
        </section>
    )
}

export default PreviewFiles