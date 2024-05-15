import { authOptions } from "@/app/lib/authConfig";
import { ApiResponse } from "@/app/utils/response";
import { fork } from "child_process";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export const GET = async (_req: NextRequest) => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")

        // const res = await getChildrenAccessListByFolderId("6643aafcc22b8756ce071c92")

        fork("./.next/server/update_access.worker.js", ["hello"])

        // if (res?.data) {
        //     return response.status(res.status).send({
        //         data: res?.data
        //     })
        // }

        return response.status(200).send("Done")
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}