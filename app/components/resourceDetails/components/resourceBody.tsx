"use client"

import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
    toggleModal as toggleModalState
} from "@/app/store/actions"
import { formatBytes } from '@/app/utils/index.utils'
import Image from 'next/image'
import AvatarComponent from '../../avatar'
import ButtonGroup from '../../buttonGroup'
import { getFileIconByType } from '../../fileListItem/utils/index.utils'
import style from '../style.module.scss'


const ResourceBody = () => {
    const { data, selectedResourceId } = useAppSelector(state => state?.resourceInfo)
    const dispatch = useAppDispatch()
    const resourceInfo = data?.[selectedResourceId]


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
                {resourceInfo?.dataType === DATA_TYPE.FOLDER ? <i className="bi bi-folder-fill"></i> : resourceInfo?.mimeType && <Image src={getFileIconByType(resourceInfo?.mimeType ?? "")} width={70} height={70} alt={"file-icon"} />}
            </div>

            <section className={style.access}>
                <p className={style.headline}>Who has access</p>

                <div className={style.accessWrapper}>
                    {resourceInfo?.accessList?.map((access, index) => <AvatarComponent
                        key={access?._id ?? index}
                        className={style.avatar}
                        user={access?.userInfo} />)}
                </div>

                <ButtonGroup type="button" className={style.manageAccess} submitText="Manage access" handleSubmit={toggleModal} />
            </section>

            <section className={style.details}>
                <p className={`${style.headline} mb-2`}>Resource Details</p>

                <div>
                    <p>Owner</p>
                    <span><small>{resourceInfo?.isOwner ? "me" : `${resourceInfo?.ownerInfo?.firstName} ${resourceInfo?.ownerInfo?.lastName}`}</small></span>
                </div>

                <div>
                    <p>Modified</p>
                    <span>{resourceInfo?.lastModified && new Date(resourceInfo?.lastModified ?? "").toLocaleDateString()}</span>
                </div>

                {resourceInfo?.dataType === DATA_TYPE.FILE && <div>
                    <p>Size</p>
                    <span><small>{formatBytes(resourceInfo?.fileSize ?? 0)}</small></span>
                </div>}


                {resourceInfo?.dataType === DATA_TYPE.FILE && <div>
                    <p>Type</p>
                    <div className='d-flex align-items-center mt-1'><Image className='me-2' src={getFileIconByType(resourceInfo?.mimeType ?? "")} width={20} height={20} alt='icon-image' /> <span><small>{resourceInfo?.mimeType}</small></span></div>
                </div>}

                <div>
                    <p>Created</p>
                    <span><small>{resourceInfo?.createdAt && new Date(resourceInfo?.createdAt).toLocaleDateString()}</small></span>
                </div>
            </section >

        </div >
    )
}

export default ResourceBody