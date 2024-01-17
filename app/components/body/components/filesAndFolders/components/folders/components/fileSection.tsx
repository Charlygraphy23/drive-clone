import MyTable from "@/app/components/table";
import React from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
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
];

const dummyApiCall = async () => {
  return dataset;
};

const FileSection = () => {
  return <MyTable columns={columns} api={dummyApiCall}/>;
};

export default FileSection;
