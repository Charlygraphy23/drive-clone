import { DATA_TYPE } from "@/app/interfaces/index.interface";
import React from "react";
import BinTableComponent from "./binTableComponent";

const dataset = [
	{
		_id: "afsdfsdfs",
		name: "Monthly report July",
		member: "Only You",
		createAt: new Date().toDateString(),
		path: "/",
		type: DATA_TYPE.FOLDER,
	},
	{
		_id: "3422",
		name: "Campaign plan 2024",
		member: "4 members",
		createAt: new Date().toDateString(),
		path: "/",
		type: DATA_TYPE.FOLDER,
	},

	{
		_id: "asdkj21233123",
		name: "Dummy",
		createAt: new Date().toDateString(),
		size: 3000, // bytes
		path: "/",
		type: DATA_TYPE.FILE,
	},
	{
		_id: "sad312e231",
		name: "my folder",
		createAt: new Date().toDateString(),
		size: 1230, // bytes
		path: "/",
		type: DATA_TYPE.FILE,
	},
];

const api = async () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(dataset);
		}, 2000);
	});
};

async function restoreApi() {
	"use server";

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, 5000);
	});
}

const BinPage = async () => {
	const data = await api();

	return (
		<BinTableComponent
			data={data as Record<string, any>[]}
			restoreApi={restoreApi}
		/>
	);
};

export default BinPage;
