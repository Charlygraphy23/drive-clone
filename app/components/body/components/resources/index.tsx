
import EmptySection from "./components/emptySection";
import FileSection from "./components/files";
import FolderComponent from "./components/folders";
import FileAndFolderStateProvider from "./provider";



type Props = {
	folderId?: string
}


const Resources = async ({ folderId }: Props) => {
	return (
		<FileAndFolderStateProvider id={folderId}>
			<FolderComponent />
			<FileSection />
			<EmptySection />
		</FileAndFolderStateProvider>
	);
};

export default Resources;
