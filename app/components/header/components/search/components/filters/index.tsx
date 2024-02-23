"use client"

import { DatePicker, SelectProps } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import FilterSelect from './components/filterSelect';
import FilterWrapper from './components/filterWrapper';
import style from './style.module.scss';
import { CONTENT_TYPE, HASHTAGS, getContentType, getTagsForSearch } from './utils/index.utils';

export interface FilterStateType {
    createdAt: [typeof Dayjs, typeof Dayjs],
    exifDate: [typeof Dayjs, typeof Dayjs],
    type: string[],
    hashtags: string[]
}

const { RangePicker } = DatePicker;
const typeOptions: SelectProps['options'] = getContentType(CONTENT_TYPE)
const hashtagsOptions: SelectProps['options'] = getTagsForSearch(HASHTAGS)



const SearchFilters = () => {
    const [state, setState] = useState<FilterStateType>({
        createdAt: [Dayjs, Dayjs],
        exifDate: [Dayjs, Dayjs],
        type: [],
        hashtags: []
    });

    const onChange = (value: any, type: keyof FilterStateType) => {
        console.log("Value", value, type)

        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    return (
        <div className={style.filters}>
            <h5 className="mb-4">Filters</h5>

            <div className={style.wrapper}>
                <FilterWrapper label='By Upload Date' >
                    <RangePicker
                        value={state.createdAt as any}
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
                        value={state.exifDate as any}
                        allowClear
                        onChange={(dates) => onChange(dates, "exifDate")}
                    />
                </FilterWrapper>

                <FilterWrapper label='By File Date' >
                    <FilterSelect
                        value={state.type}
                        onChange={onChange}
                        options={typeOptions}
                        type={"type"}

                    />
                </FilterWrapper>


                <FilterWrapper label='By File Date' >
                    <FilterSelect
                        value={state.hashtags}
                        onChange={onChange}
                        options={hashtagsOptions}
                        type={"hashtags"}
                    />
                </FilterWrapper>


                <div className={style.buttonGroup}>
                    <button>Reset</button>
                    <button>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default SearchFilters