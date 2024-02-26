"use client"

import { DatePicker, SelectProps } from 'antd';
import { Dayjs } from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { FilterStateType } from '../../interfaces/index.interface';
import { submitFilters } from '../../store/actions';
import { SearchContext } from '../../store/context';
import FilterSelect from './components/filterSelect';
import FilterWrapper from './components/filterWrapper';
import style from './style.module.scss';
import { CONTENT_TYPE, HASHTAGS, getContentType, getTagsForSearch } from './utils/index.utils';


const { RangePicker } = DatePicker;
const typeOptions: SelectProps['options'] = getContentType(CONTENT_TYPE)
const hashtagsOptions: SelectProps['options'] = getTagsForSearch(HASHTAGS)


const SearchFilters = () => {
    const { state: contextState, dispatch } = useContext(SearchContext)
    const [state, setState] = useState<FilterStateType>({
        createdAt: [Dayjs, Dayjs],
        exifDate: [Dayjs, Dayjs],
        type: [],
        hashtags: []
    });

    const onChange = (value: any, type: keyof FilterStateType) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handleSubmit = () => {
        dispatch(submitFilters(state))
    }

    const resetFilters = () => {
        dispatch(submitFilters({} as FilterStateType))
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
        <div className={`${style.filters} ${contextState.isFilterShown && style.show}`}>
            <h5 className="mb-4">Filters</h5>

            <div className={style.wrapper}>
                <FilterWrapper label='By Upload Date' >
                    <RangePicker
                        value={state?.createdAt as any}
                        allowClear
                        popupClassName="antd__appTheme"
                        className="antd__appTheme"
                        onChange={(dates) => onChange(dates, "createdAt")}
                    />
                </FilterWrapper>

                <FilterWrapper label='By File Date' >
                    <RangePicker
                        popupClassName="antd__appTheme"
                        className="antd__appTheme"
                        value={state?.exifDate as any}
                        allowClear
                        onChange={(dates) => onChange(dates, "exifDate")}
                    />
                </FilterWrapper>

                <FilterWrapper label='By File Date' >
                    <FilterSelect
                        value={state?.type}
                        onChange={onChange}
                        options={typeOptions}
                        type={"type"}

                    />
                </FilterWrapper>


                <FilterWrapper label='By File Date' >
                    <FilterSelect
                        value={state?.hashtags}
                        onChange={onChange}
                        options={hashtagsOptions}
                        type={"hashtags"}
                    />
                </FilterWrapper>
            </div>

            <div className={style.buttonGroup}>
                <button onClick={resetFilters}>Reset</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default SearchFilters