import React from "react";
import style from "../../style.module.scss";
import FileComponent from "./components/fileComponent";
import RenameFolder from "../folders/components/renameFolder";

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
			<h6 className='mt-5'>Files</h6>

			<div className={style.filesContainer}>
				<FileComponent apiCall={dummyApiCall} />
			</div>
			<RenameFolder/>
		</div>
	);
};

export default FileSection;
