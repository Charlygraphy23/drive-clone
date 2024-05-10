"use client";

import EmptyInfoAnimation from '@/app/assets/empty-info.json';
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleInfo } from "@/app/store/actions/info.actions";
import ResourceInfoLoader from "../loader/resourceInfloLoader";
import LottiePlayer from "../lottiePlayer";
import ResourceBody from './components/resourceBody';
import style from './style.module.scss';



const ResourceDetails = () => {
    const { show, data, loading, selectedFolderId } = useAppSelector(state => state?.resourceInfo)
    const dispatch = useAppDispatch()
    const folderInfo = data?.[selectedFolderId]

    const toggleResourceInfo = () => {
        dispatch(toggleInfo())
    }


    return (
        <section id="resource-info" className={`${style.resourceInfo} ${show ? style.active : ""}`}>
            <div className={style.body}>
                <div className={style.header}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-folder-fill"></i>
                        <span>{folderInfo?.name}</span>
                    </div>

                    <i className="bi bi-x" onClick={toggleResourceInfo}></i>
                </div>
                {loading ? <ResourceInfoLoader /> : !folderInfo ? <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                    <LottiePlayer animationData={EmptyInfoAnimation} loop width={200} height={200} />
                </div> : <ResourceBody />}
            </div>
        </section>

    )
}

export default ResourceDetails


