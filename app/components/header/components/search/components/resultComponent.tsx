"use client"
import Link from 'next/link'
import { useMemo } from 'react'
import { ResultType } from '../interfaces/index.interface'
import style from '../style.module.scss'
import { getResultIcon } from '../utils'

type Props = {
    type: ResultType
    title: string
    path: string,
    selected?: boolean
}

const ResultComponent = ({ type, title, path, selected = false }: Props) => {

    const fileIcon = useMemo(() => getResultIcon(type), [type])

    return (
        <Link href={path} className={`${style.option} ${selected ? style.selected : ""}`}>
            {fileIcon}
            <p>{title}</p>
            <i className="bi bi-arrow-return-left"></i>
        </Link>
    )
}

export default ResultComponent