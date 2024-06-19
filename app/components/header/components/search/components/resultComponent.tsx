"use client"
import { getFileIconByType } from '@/app/components/fileListItem/utils/index.utils'
import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import style from '../style.module.scss'

type Props = {
    type: DATA_TYPE
    title: string
    path?: string,
    selected?: boolean;
    mimeType?: string;
    fileId?: string;
}

const ResultComponent = ({ type, title, path, selected = false, mimeType, fileId }: Props) => {
    const url = useMemo(() => {
        if (type === DATA_TYPE.FILE) {
            if (path) return `q/${path}?file=${fileId}`
            return `/?file=${fileId}`
        }

        if (path) return `q/${path}`
        return "/"
    }, [path])

    const fileIcon = useCallback(() => {
        if (mimeType) {
            return <Image src={getFileIconByType(mimeType)} width={20} height={20} alt={"file-logo"} />
        }
        else return <i className="bi bi-folder-fill"></i>
    }, [mimeType])

    return (
        <Link href={url} className={`${style.option} ${selected ? style.selected : ""}`}>
            {fileIcon()}
            <p>{title}</p>
            <i className="bi bi-arrow-return-left"></i>
        </Link>
    )
}

export default ResultComponent