"use client"
import { getFileIconByType } from '@/app/components/fileListItem/utils/index.utils'
import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { toggleSearchModal } from '../store/actions'
import { SearchContext } from '../store/context'
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
    const scrollViewRef = useRef<HTMLAnchorElement>(null)
    const { dispatch } = useContext(SearchContext)
    const router = useRouter()
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

    const handleClick = () => {
        dispatch(toggleSearchModal())
    }


    useEffect(() => {
        if (!selected || !url) return;
        if (!scrollViewRef?.current) return

        const handleKeyDown = (e: KeyboardEvent) => {

            const key = e.key
            const keys = ["Enter"]

            scrollViewRef?.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })

            if (!keys.includes(key)) {
                return
            }

            router.push(url)
            dispatch(toggleSearchModal())
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }

    }, [selected, url])

    return (
        <Link ref={scrollViewRef} href={url} className={`${style.option} ${selected ? style.selected : ""}`} onClick={handleClick}>
            {fileIcon()}
            <p>{title}</p>
            <i className="bi bi-arrow-return-left"></i>
        </Link>
    )
}

export default ResultComponent