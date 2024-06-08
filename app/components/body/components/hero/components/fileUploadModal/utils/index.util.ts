import { uploadFile } from "@/app/_apis_routes/resources";

export const breakIntoChunks = async (file: File, index: number, folderId = "", getProgress: (_progress: number, _fileIndex: number) => void) => {
    return new Promise(async (resolve, reject) => {
        let uploadId = ""
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
                if (uploadId) {
                    formData.set("uploadId", uploadId)
                }
                uploadId = await uploadFile({ formData })
                console.log("Received uploadId", uploadId)
                const progress = Math.floor((idx + 1) * 100 / totalChunks)
                getProgress(progress, index)
                idx++
            }

            resolve(totalChunks)
        }
        catch (err) {
            // todo: abort the file upload with uploadId
            reject({ err, index })
        }
    })
}

export async function generateChunk(file: File) {
    const CHUNK_SIZE = 1024 * 1024 * 5 // ~500kb
    const buffer = await file.arrayBuffer();


    const fileIterator = {
        current: 0,
        to: buffer.byteLength,
    } as {
        current: number;
        to: number;
        [Symbol.iterator](): {
            from: number;
            to: number;
            next(): IteratorResult<ArrayBuffer>;
        };
    }

    fileIterator[Symbol.iterator] = function () {
        return {
            from: this.current,
            to: this.to,
            next() {
                if (this.from <= this.to) {
                    const value = buffer.slice(this.from, this.from + CHUNK_SIZE)
                    this.from = this.from + CHUNK_SIZE;
                    return { done: false, value } as IteratorResult<ArrayBuffer>
                }
                return { done: true } as IteratorResult<ArrayBuffer>

            }
        }

    }

    return Array.from(fileIterator)
}