import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { checkAuthForAppRoute } from './app/middlewre/app.middleware'

async function middleware(request: NextRequestWithAuth) {
    console.log("Hi")
    const hasAppRoutePermission = await checkAuthForAppRoute(request)
    // return NextResponse.json(new URL('/home', request.url))
}

export default withAuth(middleware, {
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: "/login",
        error: "/login",
    },
    // callbacks: {
    //     authorized({ req, token }) {
    //         console.
    //         if (!token || !token?.user) return false
    //     }
    // }
})

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}