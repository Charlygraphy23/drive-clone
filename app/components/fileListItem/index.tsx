import { formatBytes } from '@/app/utils/index.utils'
import Image from 'next/image'
import style from './style.module.scss'
import { getFileIconByType } from './utils/index.utils'

type Props = {
    className?: string
    file: File
}

const FileListItem = ({ className, file }: Props) => {
    return (
        <div className={`${style.fileList} ${className}`}>
            <div className={style.info}>
                <div className={style.icon}>
                    <Image width={20} height={20} src={getFileIconByType(file?.type)} alt="file-ico" />
                </div>
                <div className={style.description}>
                    <p><strong>{file?.name}</strong></p>
                    <span>{formatBytes(file?.size)}</span>
                </div>
            </div>
            <div>
                progress
            </div>
        </div>
    )
}

export default FileListItem