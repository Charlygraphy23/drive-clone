import { readFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

export const GET = async () => {

    const buffer = await readFile(path.join("_chunked/1720456594789-_DSC2778.jpg"))
    console.log("buffer ", buffer)
    const mimeType = 'image/png';
    return NextResponse.json(buffer, {
        headers: {
            "Content-type": mimeType
        }
    })
}