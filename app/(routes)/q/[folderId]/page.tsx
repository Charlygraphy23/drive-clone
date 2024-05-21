import PageLoader from "@/app/loading"
import Home from "@app/page"
import { Suspense } from "react"

const FolderPage = (props: {
    params: { folderId: string }
}) => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Home folderId={props.params?.folderId} />
        </Suspense>
    )
}

export default FolderPage