import { DATA_TYPE } from "@/app/interfaces/index.interface";
import BinTableComponent from "./binTableComponent";

const dataset = [
	{
		_id: "afsdfsdfs",
		name: "Monthly report July",
		member: "Only You",
		createAt: new Date().toDateString(),
		path: "/",
		type: DATA_TYPE.FOLDER,
		owner: {
			profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
			email: "randomemail@gmail.com"
		},
	},
	{
		_id: "3422",
		name: "Campaign plan 2024",
		member: "4 members",
		createAt: new Date().toDateString(),
		path: "/",
		type: DATA_TYPE.FOLDER,
		owner: {
			profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
			email: "randomemail@gmail.com"
		},
	},

	{
		_id: "asdkj21233123",
		name: "Dummy",
		createAt: new Date().toDateString(),
		size: 3000, // bytes
		path: "/",
		type: DATA_TYPE.FILE,
		owner: {
			profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
			email: "randomemail@gmail.com"
		},
	},
	{
		_id: "sad312e231",
		name: "my folder",
		createAt: new Date().toDateString(),
		size: 1230, // bytes
		path: "/",
		type: DATA_TYPE.FILE,
		owner: {
			profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
			email: "randomemail@gmail.com"
		},
	},
];

const api = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(dataset);
		}, 2000);
	});
};

const deleteForeverApi = async () => {
	"use server";
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 4000);
	});
};

async function restoreApi() {
	"use server";

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 5000);
	});
}

const BinPage = async () => {
	const data = await api();

	return (
		<BinTableComponent
			data={data as Record<string, unknown>[]}
			restoreApi={restoreApi}
			deleteApi={deleteForeverApi}
		/>
	);
};

export default BinPage;
