"use client"

import { Select, SelectProps } from 'antd';
import { FilterStateType } from '../../../interfaces/index.interface';

type Props = {
    type: keyof FilterStateType,
    value: string[],
    options: SelectProps['options']
    onChange: (value: any, type: keyof FilterStateType) => void
};

const FilterSelect = ({ value, options, onChange, type }: Props) => {
    return (
        <Select
            className="antd__appTheme"
            style={{ width: "100%" }}
            mode="multiple"
            allowClear
            value={value}
            placeholder="Please select"
            onChange={(value) => onChange(value, type)}
            options={options}
            popupClassName="antd__appTheme"
        />
    )
}

export default FilterSelect