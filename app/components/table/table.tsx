"use client";

import React, { useState } from "react";
import style from "./style.module.scss";
import TableHeader from "./components/tableHeader";
import TableBody from "./components/tableBody";
import TableContextProvider from "./store";

type Props = {
  columns: any[];
  api: () => Promise<any>;
};

const Table = ({ columns, api }: Props) => {

  return (
      <table className={style.table}>
        <TableHeader columns={columns} />
        <TableBody />
      </table>

  );
};

export default Table;
