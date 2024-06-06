export async function generateChunk(file: File) {
    const CHUNK_SIZE = 1024 * 1024 * 10
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