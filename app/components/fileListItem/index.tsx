import { FileUploadType } from '@/app/interfaces/index.interface'
import { formatBytes } from '@/app/utils/index.utils'
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
            <div>
                progress
            </div>
        </div>
    )
}

export default FileListItem