import { FileUploadType } from '@/app/interfaces/index.interface'
import { formatBytes } from '@/app/utils/index.utils'
import { Progress } from 'antd'
import Image from 'next/image'
import style from './style.module.scss'
import { getFileIconByType } from './utils/index.utils'

type Props = {
    className?: string
    media: FileUploadType
}

const FileListItem = ({ className, media }: Props) => {
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
                <Progress type="circle" percent={media.progress} size={30} status={media?.isFailed ? "exception" : "normal"} />
            </div>
        </div>
    )
}

export default FileListItem