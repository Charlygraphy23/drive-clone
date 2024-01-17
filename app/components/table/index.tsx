"use client";

import React from "react";
import TableContextProvider from "./store";
import Table from "./table";

type Props = {
  columns: any[];
  api: () => Promise<any>;
};

const MyTable = (props: Props) => {
  return (
    <TableContextProvider>
      <Table {...props} />
    </TableContextProvider>
  );
};

export default MyTable;
