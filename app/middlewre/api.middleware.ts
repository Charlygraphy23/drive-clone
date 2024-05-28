import { JWT } from "next-auth";
import { NextRequest } from "next/server";

const publicPaths = ["/signup"]

export const checkAuthForApiRoute = async (request: NextRequest, token: JWT | null) => {
    const url = new URL(request.url);
    const path = url?.pathname

    const isPublicPath = publicPaths.find(p => path.endsWith(p))

    if (isPublicPath) {
        console.log("FOUND PUBLIC API ROUTE PATH (skipping authorization check)")
        return true
    }

    if (!token) return false

    if (!token?.user) return false

    return true
}