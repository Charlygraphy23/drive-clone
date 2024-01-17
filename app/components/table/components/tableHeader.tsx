import React from "react";

type Props = {
    columns : any[]
}

const TableHeader = ({columns} : Props) => {
  return (
    <thead>
      <tr>
        {columns?.map((column , index) => <th key={index}>{column?.title}</th>)}
      </tr>
    </thead>
  );
};

export default TableHeader;
