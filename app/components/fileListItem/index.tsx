import { FileUploadType } from '@/app/interfaces/index.interface'
import { formatBytes } from '@/app/utils/index.utils'
import { Progress } from 'antd'
import Image from 'next/image'
import { useDeferredValue } from 'react'
import style from './style.module.scss'
import { getFileIconByType } from './utils/index.utils'

type Props = {
    className?: string
    media: FileUploadType
    onDelete?: (_index: number) => void
    index: number,
    uploading: boolean
}

const FileListItem = ({ className, media, onDelete, index, uploading }: Props) => {
    const differedIcon = useDeferredValue(getFileIconByType(media?.file?.type))

    const handleDelete = () => {
        if (onDelete) onDelete(index)
    }


    return (
        <div className={`${style.fileList} ${className}`}>
            <div className={style.info}>
                <div className={style.icon}>
                    <Image width={20} height={20} src={differedIcon} alt="file-ico" />
                </div>
                <div className={style.description}>
                    <p><strong>{media?.file?.name}</strong></p>
                    <span>{formatBytes(media?.file?.size)}</span>
                </div>
            </div>
            <div className={`d-flex justify-content-center align-items-center ${style.progress}`}>
                {(media?.isUploading || media.hasFinished) && <Progress type="circle" percent={media.progress} size={28} status={media?.isFailed ? "exception" : media?.hasFinished ? "success" : "normal"} /> || null}
                {(media && !media?.isUploading && !uploading && !media.hasFinished) && <i className="bi bi-trash-fill" onClick={handleDelete}></i> || null}
            </div>
        </div>
    )
}

export default FileListItem