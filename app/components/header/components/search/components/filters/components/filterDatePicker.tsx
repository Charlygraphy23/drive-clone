import { DatePicker } from "antd";
import { FilterStateType } from "../../../interfaces/index.interface";

const { RangePicker } = DatePicker;

type Props = {
    createdAt?: any
    onChange: (_value: unknown, _type: keyof FilterStateType) => void
}

const FilterDatePicker = ({ createdAt, onChange }: Props) => {
    return (
        <RangePicker
            value={createdAt as any}
            allowClear
            popupClassName="antd__appTheme"
            className="antd__appTheme"
            onChange={(dates) => onChange(dates, "createdAt")}
        />
    )
}

export default FilterDatePicker