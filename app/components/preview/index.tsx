"use client";

import { PREVIEW_MODAL } from "@/app/_config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import Image from "next/image";
import style from "./style.module.scss";




const PreviewFiles = () => {
    const {
        previewModal,
        data: fileInfo,
    } = useAppSelector((state) => state.modals);

    const dispatch = useAppDispatch()


    const handleClick = () => {
        dispatch(toggleModal({
            isOpen: false,
            name: "previewModal"
        }))
    }

    if (!previewModal) return <></>;

    return (
        <section id={PREVIEW_MODAL} className={style.preview}>
            <header>
                <div className={style.info}>
                    <i className="bi bi-arrow-left" onClick={handleClick}></i>
                    <p>File name with logo</p>
                </div>

                <i className="bi bi-download"></i>
            </header>
            <main>
                <div className={style.imageWrapper}>
                    <Image
                        style={{
                            objectFit: 'contain',

                        }}
                        fill
                        alt="random"
                        src="https://images.pexels.com/photos/20643866/pexels-photo-20643866/free-photo-of-modern-skyscraper-building.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    />
                </div>
            </main>
        </section>
    )
}

export default PreviewFiles