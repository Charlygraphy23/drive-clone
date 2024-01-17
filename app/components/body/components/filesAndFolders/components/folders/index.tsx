import React from "react";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";
import FileSection from "./components/fileSection";

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
	{
		_id: "sad312asdde231",
		name: "my  dummy folder",
		path: "myfolder",
	},

	{
		_id: "333adsdadasd",
		name: "my  dummy folder",
		path: "myfolder",
	},

	{
		_id: "asd324234",
		name: "my  dummy folder",
		path: "myfolder",
	},
];

const files = [

]

const FolderComponent = () => {
	return (
		<div className={style.folders}>
			<h6>Folders</h6>

			<div className={style.folderContainer}>
				{folders.map((folder, index) => (
					<FolderSkeleton key={index} />
				))}
			</div>

			<h6 className="mt-5">Files</h6>

			<div className={style.filesContainer}>
				<FileSection/>
			</div>
		</div>
	);
};

export default FolderComponent;
