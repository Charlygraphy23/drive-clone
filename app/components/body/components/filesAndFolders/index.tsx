import React from "react";
import FolderComponent from "./components/folders";
import style from "./style.module.scss";
import FileSection from "./components/files";

const FilesAndFolders = () => {
  return (
    <div className={style.filesAndFolders}>
      <FolderComponent />
      <FileSection />
    </div>
  );
};

export default FilesAndFolders;
