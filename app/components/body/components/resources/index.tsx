
import { authOptions } from "@/app/lib/authConfig";
import { getServerSession } from "next-auth";
import EmptySection from "./components/emptySection";
import FileSection from "./components/files";
import FolderComponent from "./components/folders";
import FileAndFolderStateProvider from "./provider";



type Props = {
	folderId?: string
}


const Resources = async ({ folderId }: Props) => {
	const session = await getServerSession(authOptions)
	const user = session?.user

	return (
		<FileAndFolderStateProvider id={folderId} user={user}>
			<FolderComponent />
			<FileSection />
			<EmptySection />
		</FileAndFolderStateProvider>
	);
};

export default Resources;
