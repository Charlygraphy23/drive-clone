"use client";

import React, { useContext } from "react";
import { TableContext } from "../store";
import TableLoader from "./tableLoader";
import TableColumnHandler from "./tableColumnHandler";

type Props = {
  columns: any[];
  loading: boolean;
};

const TableBody = ({ columns, loading }: Props) => {
  const [state] = useContext(TableContext);

  const data = state.data;

  

  return (
    <tbody>
      {data?.map((val, key) => (
        <tr key={key}>
          {columns?.map((column, i) => {
            if (i === 0)
              return <th key={i}>{<TableColumnHandler data={val} {...column}/>}</th>;
            return <td key={i}>{<TableColumnHandler data={val} {...column}/>}</td>;
          })}
        </tr>
      ))}

      {loading &&
        Array(4)
          .fill(0)
          .map((_, index) => <TableLoader key={index} />)}
    </tbody>
  );
};

export default TableBody;
