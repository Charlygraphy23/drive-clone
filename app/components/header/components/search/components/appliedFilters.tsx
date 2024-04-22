"use client"


import { APP_CONFIG } from '@/app/_config'
import { Tag } from 'antd'
import { Dayjs } from 'dayjs'
import { useCallback, useContext } from 'react'
import { FilterStateType } from '../interfaces/index.interface'
import { clearFilterByName } from '../store/actions'
import { SearchContext } from '../store/context'
import style from '../style.module.scss'

type RenderDateUIProps = {
    startDate: Dayjs,
    endDate: Dayjs
}

const AppliedFilters = () => {
    const { state, dispatch } = useContext(SearchContext);
    const { filters = {} } = state;

    const renderFilterValue = useCallback((key: keyof FilterStateType, value: Array<Dayjs> | string[]) => {
        const keysWithDate: Array<keyof FilterStateType> = ["createdAt", "exifDate"]

        if (keysWithDate.includes(key)) {
            const [startDate, endDate] = value as [Dayjs, Dayjs]
            return <RenderDateUI startDate={startDate} endDate={endDate} />
        }

        if (Array.isArray(value)) return value?.join(" , ")
        if (typeof value === "object") return <>invalid--filter</>

        return value
    }, [])

    const handleClose = (key: keyof FilterStateType) => {
        dispatch(clearFilterByName(key))
    }


    return (
        <div className={style.appliedFilters}>
            {Object.entries<Array<Dayjs> | string[]>(filters).map(([key, filter]) => <Tag
                className={style.tag}
                key={key}
                color="magenta"
                closable
                onClose={() => handleClose(key as keyof FilterStateType)}
                icon={<i className="bi bi-filter"></i>}>
                <span> <strong>{key}: </strong> {renderFilterValue(key as keyof FilterStateType, filter)}</span>
            </Tag>)}

        </div>
    )
}

export default AppliedFilters;


const RenderDateUI = ({ startDate, endDate }: RenderDateUIProps) => {
    return <span>{startDate.format(APP_CONFIG.defaultDateFormat)} <i className="bi bi-arrow-left-right mx-1"></i> {endDate.format(APP_CONFIG.defaultDateFormat)}</span>
}