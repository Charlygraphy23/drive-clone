import React from 'react';
import { TableProps } from '../interfaces/index.interface';
import style from '../style.module.scss';
import TableColumnHandler from './tableColumnHandler';

type Props<T> = {
    lastItemRef?: React.Ref<HTMLTableRowElement>,
    isActive: boolean,
    isSelectable: boolean,
    val: T
} & Partial<Pick<TableProps<T>, "columns" | "onRowClick">>

const TableRow = <T,>({ columns, onRowClick, lastItemRef, isActive, isSelectable, val }: Props<T>) => {

    return (
        <tr ref={lastItemRef} className={`${isActive ? style.active : ""} ${isSelectable ? style.selectable : ""}`} onClick={() => {
            if (onRowClick) onRowClick(val)
        }}>
            {columns?.map((column, i) => {
                if (i === 0)
                    return (
                        <th key={i}>
                            {<TableColumnHandler<T> data={val} {...column} />}
                        </th>
                    );
                return (
                    <td key={i}>
                        {<TableColumnHandler<T> data={val} {...column} />}
                    </td>
                );
            })}
        </tr>
    )
}

export default TableRow