import { getResources } from "@/app/api/resources/_fetch";
import { FileAndFolderDatasetType } from "@/app/components/body/components/resources/interfaces/index.interface";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import BinTableComponent from "./binTableComponent";

const api = async () => {
	const dataset = await getResources("", DATA_TYPE.FOLDER, true);
	return JSON.parse(JSON.stringify(dataset?.data)) as FileAndFolderDatasetType["folders"]
};

const BinPage = async () => {
	const data = await api();

	return (
		<BinTableComponent
			data={data}
		/>
	);
};

export default BinPage;
