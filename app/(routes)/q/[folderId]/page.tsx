import Home from "@app/page"

const FolderPage = (props: {
    params: { folderId: string }
}) => {
    return (
        <Home folderId={props.params?.folderId} />
    )
}

export default FolderPage