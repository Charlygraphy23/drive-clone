"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleInfo } from "@/app/store/actions/info.actions";
import AvatarComponent from "../avatar";
import ButtonGroup from "../buttonGroup";
import ResourceInfoLoader from "../loader/resourceInfloLoader";
import style from './style.module.scss';



const ResourceDetails = () => {
    const { show, data, loading } = useAppSelector(state => state?.resourceInfo)
    const dispatch = useAppDispatch()

    const toggleResourceInfo = () => {
        dispatch(toggleInfo())
    }


    return (
        <>
            {loading ? <ResourceInfoLoader /> :
                <section className={`${style.resourceInfo} ${show ? style.active : ""}`}>
                    <div className={style.body}>
                        <div className={style.header}>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-folder-fill"></i>
                                <span>Backenddasdasdasdasd</span>
                            </div>

                            <i className="bi bi-x" onClick={toggleResourceInfo}></i>
                        </div>

                        <div className={style.scrollable}>

                            <div className={style.preview}>
                                <i className="bi bi-folder-fill"></i>
                            </div>



                            <section className={style.access}>
                                <p className={style.headline}>Who has access</p>

                                <div className={style.accessWrapper}>
                                    {Array(7).fill(0).map((_, i) => <AvatarComponent className={style.avatar} key={i} />)}
                                </div>

                                <ButtonGroup className={style.manageAccess} submitText="Manage access" />
                            </section>

                            <section className={style.details}>
                                <p className={`${style.headline} mb-2`}>Folder Details</p>

                                <div>
                                    <p>Owner</p>
                                    <span>{data.isOwner ? "me" : data?.ownerInfo?.firstName}</span>
                                </div>

                                <div>
                                    <p>Modified</p>
                                    <span>{data.lastModified && new Date(data.lastModified).toLocaleDateString()}</span>
                                </div>

                                <div>
                                    <p>Created</p>
                                    <span>{data.createdAt && new Date(data.createdAt).toLocaleDateString()}</span>
                                </div>
                            </section>
                        </div>
                    </div>

                </section>}
        </>
    )
}

export default ResourceDetails