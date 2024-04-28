import { NextRequestWithAuth } from "next-auth/middleware";

const publicPaths = ["/login", "/getting-started"]

export const checkAuthForAppRoute = async (request: NextRequestWithAuth) => {
    const url = new URL(request.url);

    const path = url?.pathname

    const isPublicPath = publicPaths.find(p => path.includes(p))

    if (isPublicPath) console.log("FOUND PUBLIC APP ROUTE PATH (skipping authorization check)")

    if (!isPublicPath) {
        // const session = await getServerSession(authConfig)
        console.log("Next Auth", request.nextauth)

        // TODO: check for authentication
    }




}