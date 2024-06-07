import { FileUploadType } from '@/app/interfaces/index.interface'
import { formatBytes } from '@/app/utils/index.utils'
import { Progress } from 'antd'
import Image from 'next/image'
import style from './style.module.scss'
import { getFileIconByType } from './utils/index.utils'

type Props = {
    className?: string
    media: FileUploadType
    onDelete?: () => void
}

const FileListItem = ({ className, media, onDelete }: Props) => {

    const handleDelete = () => {
        if (onDelete) onDelete()
    }

    return (
        <div className={`${style.fileList} ${className}`}>
            <div className={style.info}>
                <div className={style.icon}>
                    <Image width={20} height={20} src={getFileIconByType(media?.file?.type)} alt="file-ico" />
                </div>
                <div className={style.description}>
                    <p><strong>{media?.file?.name}</strong></p>
                    <span>{formatBytes(media?.file?.size)}</span>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                {(media?.isUploading || media.hasFinished) && <Progress type="circle" percent={media.progress} size={media?.progress} status={media?.isFailed ? "exception" : "normal"} /> || null}
                {(media && !media?.isUploading && !media.hasFinished) && <i className="bi bi-trash-fill" onClick={handleDelete}></i> || null}
            </div>
        </div>
    )
}

export default FileListItem