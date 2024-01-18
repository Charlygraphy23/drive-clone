"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./style.module.scss";
import TableHeader from "./components/tableHeader";
import TableBody from "./components/tableBody";
import TableContextProvider, { TableContext } from "./store";
import { useQuery } from "@tanstack/react-query";

type Props = {
  columns: any[];
  api: () => Promise<any>;
};

const Table = ({ columns, api }: Props) => {
  const [_, dispatch] = useContext(TableContext);

  const getTableData = async () => {
    const apiData = await api();
    return apiData;
  };

  const query = useQuery({ queryKey: ["data"], queryFn: getTableData });

  useEffect(() => {
    dispatch({
      type: "add",
      payload: query.data,
    });
  }, [dispatch, query.data, query.isFetched]);

  return (
    <table cellSpacing={10} className={style.table}>
      <TableHeader columns={columns} />
      <TableBody columns={columns} loading={query.isLoading} />
    </table>
  );
};

export default Table;
