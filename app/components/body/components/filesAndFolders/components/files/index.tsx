import MyTable from "@/app/components/table";
import React from "react";
import PDFLogo from "@app/assets/pdf-icon.svg";
import style from "../../style.module.scss";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    icon: PDFLogo,
  },
  {
    title: "Member",
    dataIndex: "member",
  },

  {
    title: "Last Modified",
    dataIndex: "lastModified",
  },

  {
    title: "",
    dataIndex: "",
  },
];

const dataset = [
  {
    name: "Monthly report July",
    member: "Only You",
    lastModified: new Date().toLocaleString(),
  },
  {
    name: "Campaign plan 2024",
    member: "4 members",
    lastModified: new Date().toLocaleString(),
  },

  {
    name: "Quick CV portfolio",
    member: "10 members",
    lastModified: new Date().toLocaleString(),
  },
  {
    name: "Quick CV portfolio",
    member: "10 members",
    lastModified: new Date().toLocaleString(),
  },
  {
    name: "Quick CV portfolio",
    member: "10 members",
    lastModified: new Date().toLocaleString(),
  },
];

const FileSection = () => {
  const dummyApiCall = async () => {
    "use server";
    return dataset;
  };

  return (
    <div className={style.files}>
      <h6 className="mt-5">Files</h6>

      <div className={style.filesContainer}>
        <MyTable columns={columns} api={dummyApiCall} />
      </div>
    </div>
  );

};

export default FileSection;
