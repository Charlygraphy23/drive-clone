"use client"

import { FILTER_BUTTON_ID } from '@/app/_config/const'
import useDeviceWidth from '@/app/hooks/useWidth'
import { disabledClick } from '@/app/utils/index.utils'
import { useContext, useEffect, useRef } from 'react'
import { toggleFilterView } from '../../store/actions'
import { SearchContext } from '../../store/context'
import SearchFilters from './components/filterBody'
import style from './style.module.scss'

const FilterLayout = () => {
    const { width } = useDeviceWidth()
    const { state: contextState, dispatch } = useContext(SearchContext)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event?.target as Element;
            const isDisable = disabledClick(target)
            if (ref.current && event?.target && !ref.current.contains(target) && target?.id !== FILTER_BUTTON_ID && !isDisable) {
                dispatch(toggleFilterView(false))
            }
        }

        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }

    }, [])

    return (
        <>
            {width > 536 && <SearchFilters />}
            {width <= 536 && <div ref={ref} className={`${style.smallScreenFilters} ${contextState.isFilterShown ? style["--show"] : ""}`}>
                <div className={style.smallScreenFilters__wrapper}>
                    <SearchFilters className={style.container} hide={() => dispatch(toggleFilterView(false))} />
                </div>
            </div>}
        </>
    )
}

export default FilterLayout