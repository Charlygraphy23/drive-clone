import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const publicAppRoutes = ["/login", "/getting-started", "/reset-password", "/plans", "/terms-and-conditions", "/privacy-policy", "/contact-us", "/refund-policy"]

export const checkAuthForAppRoute = async (request: NextRequest, token: JWT | null) => {
    const url = new URL(request.url);
    const path = url?.pathname

    const isPublicPath = publicAppRoutes.find(p => path.startsWith(p))

    if (isPublicPath) {
        console.log("FOUND PUBLIC APP ROUTE PATH (skipping authorization check)")
        return true
    }

    if (!token) return false

    if (!token?.user) return false

    return true
}