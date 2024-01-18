import React from "react";
import style from "../style.module.scss";

const TableLoader = () => {
  return (
    <tr className={style.skelton}>
      <td>
        <div></div>
      </td>
      <td>
        <div></div>
      </td>
      <td>
        <div></div>
      </td>
      <td>
        <div></div>
      </td>
    </tr>
  );
};

export default TableLoader;
