"use client"

import { DatePicker, Select, SelectProps } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import FilterWrapper from './components/filterWrapper';
import style from './style.module.scss';
import { CONTENT_TYPE } from './utils/index.utils';

// dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const options: SelectProps['options'] = CONTENT_TYPE.map(val => ({
    label: val?.toUpperCase(),
    value: val
}));

const SearchFilters = () => {
    const [state, setState] = useState({
        createdAt: [Dayjs, Dayjs],
        exifDate: [Dayjs, Dayjs],
        type: options
    });

    const onChange = (value: any, type: keyof typeof state) => {
        console.log("Value", value)

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
                    <RangePicker value={state.createdAt as any} allowClear onChange={(dates) => onChange(dates, "createdAt")} />
                </FilterWrapper>

                <FilterWrapper label='By File Date' >
                    <RangePicker value={state.createdAt as any} allowClear onChange={(dates) => onChange(dates, "exifDate")} />
                </FilterWrapper>

                <FilterWrapper label='By File Date' >
                    <Select
                        style={{ width: "100%" }}
                        mode="multiple"
                        allowClear
                        value={state.type}
                        placeholder="Please select"
                        onChange={(value) => onChange(value, "type")}
                        options={options}
                    />
                </FilterWrapper>
            </div>
        </div>
    )
}

export default SearchFilters