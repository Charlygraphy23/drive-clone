"use client";

import EmptyInfoAnimation from '@/app/assets/empty-info.json';
import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces';
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleInfo } from "@/app/store/actions/info.actions";
import Image from 'next/image';
import { getFileIconByType } from '../fileListItem/utils/index.utils';
import ResourceInfoLoader from "../loader/resourceInfloLoader";
import LottiePlayer from "../lottiePlayer";
import ManageAccess from './components/manageAccess';
import ResourceBody from './components/resourceBody';
import style from './style.module.scss';



const ResourceDetails = () => {
    const { show, data, loading, selectedResourceId } = useAppSelector(state => state?.resourceInfo)
    const dispatch = useAppDispatch()
    const resourceInfo = data?.[selectedResourceId]

    const toggleResourceInfo = () => {
        dispatch(toggleInfo())
    }


    return (
        <section id="resource-info" className={`${style.resourceInfo} ${show ? style.active : ""}`}>
            <div className={style.body}>
                <div className={style.header}>
                    <div className="d-flex align-items-center">
                        {resourceInfo?.dataType === DATA_TYPE.FOLDER ? <i className="bi bi-folder-fill"></i> : resourceInfo?.mimeType && <Image className='me-2' src={getFileIconByType(resourceInfo?.mimeType ?? "")} width={20} height={20} alt={"file-icon"} />}
                        <span>{resourceInfo?.name}</span>
                    </div>

                    <i className="bi bi-x" onClick={toggleResourceInfo}></i>
                </div>
                {loading ? <ResourceInfoLoader /> : !resourceInfo ? <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                    <LottiePlayer animationData={EmptyInfoAnimation} loop width={200} height={200} />
                </div> : <ResourceBody />}
            </div>
            <ManageAccess />

        </section>

    )
}

export default ResourceDetails


