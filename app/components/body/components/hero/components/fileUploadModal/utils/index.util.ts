import { uploadFile } from "@/app/_apis_routes/resources";
import { generateChunk } from "@/app/utils/fileUpload";

export const breakIntoChunks = async (file: File, index: number, folderId = "", getProgress: (_progress: number) => void) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chunks = await generateChunk(file)
            const formData = new FormData();
            formData.append("totalSize", String(file.size))
            formData.append("name", file.name)
            if (folderId) {
                formData.append("folderId", folderId)
            }

            let idx = 0;
            const totalChunks = chunks?.length
            for await (const chunk of chunks) {
                formData.set("file", new Blob([chunk]))
                formData.set("chunkIndex", String(idx))
                formData.set("totalChunks", String(totalChunks))
                await uploadFile({ formData })
                const progress = Math.floor((idx + 1) * 100 / totalChunks)
                getProgress(progress)
                idx++
            }

            resolve(totalChunks)
        }
        catch (err) {
            reject({ err, index })
        }
    })
}