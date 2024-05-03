import FileLoader from "./fileLoader";
import FolderLoader from "./folderLoader";

const FileAndFolderLoader = () => {
	console.log("LOADER CALL")
	return (
		<>
			<FolderLoader />
			<FileLoader />
		</>
	);
};

export default FileAndFolderLoader;
