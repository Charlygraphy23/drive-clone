export const downloadFile = ({ url, fileName }: {
    url: string,
    fileName: string,
}) => {
    if (!url) return;

    setTimeout(() => {
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = fileName
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
    }, 1000)
}