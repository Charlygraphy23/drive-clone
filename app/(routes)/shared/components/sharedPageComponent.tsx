import EmptySection from '@/app/components/body/components/resources/components/emptySection';
import FileSection from '@/app/components/body/components/resources/components/files';
import FolderComponent from '@/app/components/body/components/resources/components/folders';
import { authOptions } from '@/app/lib/authConfig';
import FileAndFolderStateProvider from "@app/components/body/components/resources/provider";
import { getServerSession } from 'next-auth';


const SharedPageComponent = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user

    return (
        <FileAndFolderStateProvider isShared user={user}>
            <FolderComponent isShared />
            <FileSection isShared />
            <EmptySection />
        </FileAndFolderStateProvider>
    )
}

export default SharedPageComponent