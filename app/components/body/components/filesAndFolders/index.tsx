import React from "react";
import FolderComponent from "./components/folders";
import style from "./style.module.scss";
import FileSection from "./components/files";
import FileAndFolderStateProvider from "./provider";
import RenameModal from "../modals/rename";


const data = {
  files: [{
    _id: "afsdfsdfs",
    name: "Monthly report July",
    member: "Only You",
    lastModified: new Date().toDateString(),
  },
  {
    _id: "3422",
    name: "Campaign plan 2024",
    member: "4 members",
    lastModified: new Date().toDateString(),
  },

  {
    _id: "afsdfasd34sdfs",
    name: "Quick CV portfolio",
    member: "10 members",
    lastModified: new Date().toDateString(),
  },
  {
    _id: "afss3423dfsdfs",
    name: "Quick CV portfolio",
    member: "10 members",
    lastModified: new Date().toDateString(),
  },
  {
    _id: "afsdfsasdas432dfs",
    name: "Quick CV portfolio",
    member: "10 members",
    lastModified: new Date().toDateString(),
  },],
  folders: [],
};

const api = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 5000);
  });
};

const FilesAndFolders = async () => {
  const dataset = await api();

  return (
    <FileAndFolderStateProvider data={dataset}>
      <div className={style.filesAndFolders}>
        <FolderComponent />
        <FileSection />
        <RenameModal />
      </div>
    </FileAndFolderStateProvider>
  );
};

export default FilesAndFolders;
