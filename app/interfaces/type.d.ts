/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DefaultSession } from "next-auth";
import { UserSchemaType } from "../lib/database/interfaces/user.interface";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URL: string
            NEXTAUTH_SECRET: string
            OBJECT_SPACE_KEY: string
            OBJECT_SECRET_KEY: string
            OBJECT_SPACE_ENDPOINT: string
            OBJECT_BUCKET_NAME: string
            RAZORPAY_KEY_ID: string
            RAZORPAY_SECRET_KEY: string
            QSTASH_CURRENT_SIGNING_KEY: string
            QSTASH_NEXT_SIGNING_KEY: string
            // add more environment variables and their types here
        }
    }

    namespace window {
        interface Razorpay { }
    }
}

declare module 'next-auth' {
    interface Session {
        user: UserSchemaType & Omit<DefaultSession['user'], 'image'>;
    }

    interface User extends UserSchemaType { }

    interface JWT {
        user: User
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        user: User
    }
}

declare module 'mongoose' {
    interface QueryOptions {
        withDeleted?: boolean;
    }
    interface AggregateOptions {
        withDeleted?: boolean;
    }
    interface SessionOption {
        withDeleted?: boolean;
    }

}
