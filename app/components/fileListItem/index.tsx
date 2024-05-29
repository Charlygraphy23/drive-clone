import { formatBytes } from '@/app/utils/index.utils'
import Image from 'next/image'
import style from './style.module.scss'

type Props = {
    className?: string
    file: File
}

const FileListItem = ({ className, file }: Props) => {
    return (
        <div className={`${style.fileList} ${className}`}>
            <div className={style.info}>
                <div className={style.icon}>
                    <Image width={50} height={50} src="/app/assets/pdf-icon.svg" alt="file-ico" />
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