import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import sharp from "sharp";
import { Stream } from "stream";

function getQualityForSharp(quality: "high" | "medium" | "low") {
    switch (quality) {
        case 'low':
            return { width: 200, quality: 40 }
        case 'medium':
            return { width: 500, quality: 60 }
        case 'high':
        default:
            return { width: 1000, quality: 100 }
    }
}

export const GET = async (req: NextRequest, { params }: { params: { fileId: string } }) => {
    const service = new ResourceService();
    const response = new ApiResponse()

    const quality = new URL(req?.url)?.searchParams.get('quality') ?? "high"

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const fileId = params?.fileId;

        if (!fileId) return response.status(422).send("Invalid url")

        const range = req?.headers?.get('Range') ?? "";

        await connectDB()

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: fileId ?? "",
        }, { withDeleted: true })


        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }


        const {
            stream, fileInfo, ...rest
        } = await service.getFileStream(fileId, range);

        if (fileInfo?.mimeType && fileInfo?.mimeType?.startsWith("video") && range) {
            const { start, end, size } = rest
            return response.setHeaders({
                "Content-Type": fileInfo?.mimeType as string,
                "Content-Range": `bytes ${start}-${end}/${size}`,
                "Accept-Ranges": "bytes",
            }).send(stream, 206, true)
        }


        if (fileInfo?.mimeType && fileInfo?.mimeType?.startsWith("image")) {
            const readStream = stream as Stream;
            const sharpQuality = getQualityForSharp(quality as "high" | "medium" | "low")
            const transformStream = sharp().resize({ width: sharpQuality.width });
            console.log("Sharp Quality ", sharpQuality)

            if (fileInfo?.mimeType.endsWith("jpeg")) {
                transformStream.jpeg({ quality: sharpQuality.quality })
            }
            else if (fileInfo?.mimeType.endsWith("png")) {
                transformStream.png({ quality: sharpQuality.quality })
            }

            readStream.pipe(transformStream)

            return response.setHeaders({
                "Content-Type": fileInfo?.mimeType as string,
            }).send(transformStream, 200, true)
        }

        return response.setHeaders({
            "Content-Type": fileInfo?.mimeType as string,
        }).send(stream, 200, true)

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
};