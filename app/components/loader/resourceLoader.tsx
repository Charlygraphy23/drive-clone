import FileLoader from "./fileLoader";
import FolderLoader from "./folderLoader";

const ResourceLoader = () => {
	return (
		<>
			<FolderLoader />
			<FileLoader />
		</>
	);
};

export default ResourceLoader;
