import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { checkAuthForApiRoute } from "./api.middleware";
import { checkAuthForAppRoute } from "./app.middleware";

export const handleMiddleware = async (request: NextRequest, token: JWT | null) => {
    const url = new URL(request.url);

    const path = url?.pathname

    const isApiRoute = path.startsWith('/api')

    if (isApiRoute) return await checkAuthForApiRoute(request, token)

    return await checkAuthForAppRoute(request, token)

}