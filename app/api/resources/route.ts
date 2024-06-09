import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { ApiResponse } from "@/app/utils/response";
import { NextRequest } from "next/server";
import { getResources } from "./_fetch";

export const GET = async (_req: NextRequest) => {
    const response = new ApiResponse()

    try {
        const queryParams = _req.nextUrl.searchParams
        const resourceId = queryParams.get("resourceId") as string
        const page = parseInt(queryParams.get("page") as string)
        const limit = parseInt(queryParams.get("limit") as string)

        const resources = await getResources(resourceId, DATA_TYPE.FILE, false, "show", page, limit)

        if (resources?.status !== 200) {
            return response.status(resources?.status).send(resources?.message)
        }

        const data = resources?.data
        // fork("./.next/server/update_access.worker.js", ["hello"])
        const totalPages = Math.ceil(data?.total / limit)

        return response.status(200).send({
            page: page,
            limit: limit,
            next: page < totalPages,
            data: data?.resources
        })
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}