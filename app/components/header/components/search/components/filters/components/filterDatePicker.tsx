/* eslint-disable no-unused-vars */
"use client"

import useDeviceWidth from "@/app/hooks/useWidth";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { FilterStateType } from "../../../interfaces/index.interface";
import style from '../style.module.scss';

const { RangePicker } = DatePicker;

type Props = {
    createdAt?: any
    onChange: (_value: unknown, _type: keyof FilterStateType) => void
}

const FilterDatePicker = ({ createdAt, onChange }: Props) => {

    const { width } = useDeviceWidth()

    const handleBundleInputChange = (date: Dayjs, selectedDateBox: 0 | 1) => {
        if (!createdAt?.length) {
            const arr = [] as Dayjs[]
            arr[selectedDateBox] = date
            return onChange(arr, "createdAt")
        }

        if (selectedDateBox === 1) {
            // End Date
            const [startDate] = createdAt

            if ((date && startDate && date.diff(startDate) > 0) || !startDate) {
                createdAt[selectedDateBox] = date
            } else if (date && startDate && date.diff(startDate) < 0) {
                createdAt[0] = date
                createdAt[1] = startDate
            }

            return onChange(createdAt, "createdAt")
        }

        // Start Date
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, endDate] = createdAt

        if ((date && endDate && endDate.diff(date) > 0) || !endDate) {
            createdAt[selectedDateBox] = date
        } else if (date && endDate && endDate.diff(date) < 0) {
            createdAt[0] = endDate
            createdAt[1] = date
        }

        return onChange(createdAt, "createdAt")
    }


    return (
        <>
            {width > 640 ? <RangePicker
                value={createdAt as any}
                allowClear
                popupClassName="antd__appTheme"
                className="antd__appTheme"
                onChange={(dates) => onChange(dates, "createdAt")}
            /> : <div className={style.dateCombo}>
                <DatePicker
                    value={createdAt?.[0]}
                    allowClear
                    popupClassName="antd__appTheme"
                    className="antd__appTheme"
                    onChange={(date) => handleBundleInputChange(date, 0)}
                    placeholder="Select start date"
                />

                <DatePicker
                    value={createdAt?.[1]}
                    allowClear
                    popupClassName="antd__appTheme"
                    className="antd__appTheme"
                    onChange={(date) => handleBundleInputChange(date, 1)}
                    placeholder="Select end date"
                />
            </div>}
        </>
    )
}

export default FilterDatePicker