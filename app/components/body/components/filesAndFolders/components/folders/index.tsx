import React from "react";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";

const folders = [
	{
		_id: "asdkj21233123",
		name: "Dummy",
		path: "dummy",
	},
	{
		_id: "sad312e231",
		name: "my folder",
		path: "myfolder",
	},
];

const FolderComponent = () => {
	return (
		<div className={style.folders}>
			<h6>Folders</h6>

			<div className={style.folderContainer}>
				{folders.map((folder, index) => (
					<FolderSkeleton key={index} />
				))}
			</div>
		</div>
	);
};

export default FolderComponent;
