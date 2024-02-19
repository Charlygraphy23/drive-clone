"use client"

import Accordion from '@/app/components/accordion';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import FilterWrapper from './components/filterWrapper';
import style from './style.module.scss';

// dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;


const SearchFilters = () => {
    const [state, setState] = useState({
        createdAt: [Dayjs, Dayjs],
        exifDate: [Dayjs, Dayjs],

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
                    {/* TODO: need multiselect filter to choose mimetype */}
                    <Accordion
                        className={style.accordion}
                        button={{
                            title: "Show demo",
                            className: style.header
                        }}
                        content={{
                            className: style.content
                        }}>
                        hello
                    </Accordion>
                </FilterWrapper>
            </div>
        </div>
    )
}

export default SearchFilters