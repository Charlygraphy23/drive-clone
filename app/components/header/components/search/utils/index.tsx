import { ResultType } from "../interfaces/index.interface";

export const getResultIcon = (type: ResultType) => {
    if (type === "folder") return <i className="bi bi-folder-fill" > </i>;
    if (type === "pdf") return <i className="bi bi-file-earmark-pdf" > </i>
    if (type === "txt") return <i className="bi bi-filetype-txt" > </i>
    if (type === "img") return <i className="bi bi-image" > </i>
    return <i className="bi bi-file-earmark" > </i>
}