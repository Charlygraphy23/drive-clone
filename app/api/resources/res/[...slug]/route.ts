import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { NextResponse } from "next/server";

// export const config = {
//     api: {
//         externalResolver: true,
//         bodyParser: false,
//     },
// }

export const GET = async (req: Request, { params }: { params: { slug: string[] } }) => {
    const response = new ApiResponse()
    const service = new ResourceService()

    try {

        const key = params.slug.join("/")
        console.log(key)
        const byteArray = await service.getResourceFromS3({ key })

        if (!byteArray) return;

        // console.log(rest)
        // const blob = new Blob(byteArray)
        const res = new NextResponse(byteArray)
        res.headers.set("Content-Type", "image/jpeg")
        return res

    } catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}