"use client"

import React from "react";
import style from "../style.module.scss";

type Props = {
    label: string;
    value: string;
    dataIndex?: string

}

const ProfileInputGroup = ({label , value, dataIndex =""} : Props) => {
  return (
    <div className={style.inputGroup}>
      {/* <input id={label} type="text" /> */}
      <p>{value}</p>
      <label htmlFor="">{label}</label>
    </div>
  );
};

export default ProfileInputGroup;
