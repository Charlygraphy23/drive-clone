"use client"

import { useAppDispatch, useAppSelector } from '@/app/store'
import {
    toggleModal as toggleModalState
} from "@/app/store/actions"
import AvatarComponent from '../../avatar'
import ButtonGroup from '../../buttonGroup'
import style from '../style.module.scss'


const ResourceBody = () => {
    const { data, selectedResourceId } = useAppSelector(state => state?.resourceInfo)
    const dispatch = useAppDispatch()
    const folderInfo = data?.[selectedResourceId]


    const toggleModal = () => {
        dispatch(
            toggleModalState({
                isOpen: true,
                name: "manageAccessModal",
                data: {
                    id: selectedResourceId,
                }
            })
        );
    };


    return (
        <div className={style.scrollable}>

            <div className={style.preview}>
                <i className="bi bi-folder-fill"></i>
            </div>

            <section className={style.access}>
                <p className={style.headline}>Who has access</p>

                <div className={style.accessWrapper}>
                    {folderInfo?.accessList?.map((access, index) => <AvatarComponent
                        key={access?._id ?? index}
                        className={style.avatar}
                        user={access?.userInfo} />)}
                </div>

                <ButtonGroup type="button" className={style.manageAccess} submitText="Manage access" handleSubmit={toggleModal} />
            </section>

            <section className={style.details}>
                <p className={`${style.headline} mb-2`}>Folder Details</p>

                <div>
                    <p>Owner</p>
                    <span>{folderInfo?.isOwner ? "me" : `${folderInfo?.ownerInfo?.firstName} ${folderInfo?.ownerInfo?.lastName}`}</span>
                </div>

                <div>
                    <p>Modified</p>
                    <span>{folderInfo?.lastModified && new Date(folderInfo?.lastModified ?? "").toLocaleDateString()}</span>
                </div>

                <div>
                    <p>Created</p>
                    <span>{folderInfo?.createdAt && new Date(folderInfo?.createdAt).toLocaleDateString()}</span>
                </div>
            </section>

        </div>
    )
}

export default ResourceBody