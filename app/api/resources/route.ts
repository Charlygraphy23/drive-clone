import { authOptions } from "@/app/lib/authConfig";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { getResources } from "./_fetch";



export const GET = async (_req: NextRequest) => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")

        const res = await getResources()

        if (res?.data) {
            return response.status(res.status).send({
                data: res?.data
            })
        }

        return response.status(res.status).send(res.message)
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}