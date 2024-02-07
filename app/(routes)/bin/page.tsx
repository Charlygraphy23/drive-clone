import React from "react";
import style from "./style.module.scss";
import BinTableComponent from "./components/binTableComponent";
import { DATA_TYPE } from "../../interfaces/index.interface";
import HeaderComponent from "@/app/components/header";

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

	return await fetch("https://api.sampleapis.com/futurama/info")
		.then((res) => res.json())
		.then((data) => {
			console.log("Data fetched ");
		});
}

const page = async () => {
	const data = await api();

	return (
		<section className={style.bin}>
			<header className='d-flex justify-content-between align-items-center'>
				<h1>Bin</h1>
				<HeaderComponent hideSearch={true} />
			</header>

			<BinTableComponent
				data={data as Record<string, any>[]}
				restoreApi={restoreApi}
			/>
		</section>
	);
};

export default page;
