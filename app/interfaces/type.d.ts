/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DefaultSession } from "next-auth";
import { UserSchemaType } from "../lib/database/interfaces/user.interface";

declare module process.env {
    export const MONGO_URL: string
    export const NEXTAUTH_SECRET: string
}

declare module 'next-auth' {
    interface Session {
        user: { id: string } & Omit<UserSchemaType, "imageUrl" | "_id"> & DefaultSession['user'];
    }

    interface User extends Omit<UserSchemaType, "imageUrl"> { }

    interface JWT {
        user: User
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        user: User
    }
}
