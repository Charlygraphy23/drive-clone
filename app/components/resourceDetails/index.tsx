"use client";

import { useAppSelector } from "@/app/store";
import AvatarComponent from "../avatar";
import ButtonGroup from "../buttonGroup";
import style from './style.module.scss';



const ResourceDetails = () => {
    const { show } = useAppSelector(state => state?.resourceInfo)
    return (
        <section className={`${style.resourceInfo} ${show ? style.active : ""}`}>
            <div className={style.body}>
                <div className={style.header}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-folder-fill"></i>
                        <span>Backenddasdasdasdasd</span>
                    </div>

                    <i className="bi bi-x"></i>
                </div>

                <div className={style.preview}>
                    <i className="bi bi-folder-fill"></i>
                </div>



                <section className={style.access}>
                    <p>Who has access</p>

                    <div className={style.accessWrapper}>
                        {Array(7).fill(0).map((_, i) => <AvatarComponent key={i} />)}
                    </div>

                    <ButtonGroup className={style.manageAccess} submitText="Manage access" />
                </section>
                {/* Folder Details */}
            </div>
        </section>
    )
}

export default ResourceDetails