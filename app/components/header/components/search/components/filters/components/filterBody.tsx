"use client"

import { SelectProps } from 'antd';
import { Dayjs } from 'dayjs';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FilterStateType } from '../../../interfaces/index.interface';
import { submitFilters } from '../../../store/actions';
import { SearchContext } from '../../../store/context';
import style from '../style.module.scss';
import { CONTENT_TYPE, getContentType } from '../utils/index.utils';
import FilterDatePicker from './filterDatePicker';
import FilterSelect from './filterSelect';
import FilterWrapper from './filterWrapper';


type Props = {
    className?: string;
    hide?: () => void
}

const typeOptions: SelectProps['options'] = getContentType(CONTENT_TYPE)


const SearchFilters = ({ className, hide }: Props) => {
    const { state: contextState, dispatch } = useContext(SearchContext)
    const [state, setState] = useState<FilterStateType>({
        createdAt: [Dayjs, Dayjs],
        exifDate: [Dayjs, Dayjs],
        type: [],
        hashtags: []
    });

    const onChange = useCallback((value: unknown, type: keyof FilterStateType) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }, [])

    const handleSubmit = () => {
        dispatch(submitFilters(state))
        if (hide) hide()
    }

    const resetFilters = () => {
        dispatch(submitFilters({} as FilterStateType))
        if (hide) hide()
    }

    useEffect(() => {
        if (contextState.isFilterShown) {
            setState(contextState.filters)
        }

        return () => {
            if (!contextState.isFilterShown)
                setState({} as FilterStateType)
        }
    }, [contextState?.filters, contextState.isFilterShown])

    return (
        <div className={`${style.filters} ${className ?? ""} ${contextState.isFilterShown && style.show}`}>
            <h5 className="mb-4">Filters</h5>

            <div className={style.wrapper}>
                <div className={style.wrapper__scroll}>
                    <FilterWrapper label='By Upload Date'>
                        <FilterDatePicker
                            createdAt={state?.createdAt as any}
                            onChange={onChange}
                        />
                    </FilterWrapper>

                    {/* <FilterWrapper label='By Resource Date'>
                    <RangePicker
                        popupClassName="antd__appTheme"
                        className="antd__appTheme"
                        value={state?.exifDate as any}
                        allowClear
                        onChange={(dates) => onChange(dates, "exifDate")}
                    />
                </FilterWrapper> */}

                    <FilterWrapper label='By Resource Type'>
                        <FilterSelect
                            value={state?.type}
                            onChange={onChange}
                            options={typeOptions}
                            type={"type"}

                        />
                    </FilterWrapper>


                    {/* <FilterWrapper label='By File Date'>
                    <FilterSelect
                        value={state?.hashtags}
                        onChange={onChange}
                        options={hashtagsOptions}
                        type={"hashtags"}
                    />
                </FilterWrapper> */}
                </div>
            </div>

            <div className={style.buttonGroup}>
                <button onClick={resetFilters}>Reset</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default SearchFilters