import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { handleMiddleware } from "./app/middlewre";
import { publicAppRoutes } from "./app/middlewre/app.middleware";

async function middleware(request: NextRequestWithAuth) {
    const url = new URL(request.url);
    const path = url?.pathname
    const inPublicPath = publicAppRoutes.find(p => path.startsWith(p) && !path.startsWith("/plans"))
    console.log('inPublicPath', inPublicPath, path)
    const isApiRoute = path.startsWith("/api")

    if (request?.nextauth?.token && inPublicPath && !isApiRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.rewrite(url)
    }

}

export default withAuth(middleware, {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        authorized: async ({ req, token }) => {
            const hasPermission = await handleMiddleware(req, token)
            return !!hasPermission
        }
    }
})

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|logo.png|email-background.jpg).*)'
    ]
}