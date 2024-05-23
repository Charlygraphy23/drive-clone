import { connectDB } from "@/app/lib/database/db";
import { UserService } from "@/app/lib/database/services/user.service";
import { comparePasswordWithHash } from "@/app/lib/lib";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ValidationError } from "yup";
import { CredentialsType, credentialSchema } from "../api/auth/[...nextauth]/interfaces/index.interface";


export const authOptions: AuthOptions = {
    // Configure one or more authentication providers 
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, _req) {
                try {
                    const isValidated = await credentialSchema.isValid(credentials, { abortEarly: false })

                    if (!isValidated) return null

                    const { email, password } = credentials as CredentialsType;
                    await connectDB();

                    const service = new UserService()
                    const userObj = await service.findByEmail(email, "+password")

                    if (!userObj) return null;

                    const user = userObj?.toObject()

                    const matchedPassword = await comparePasswordWithHash(password, user?.password ?? "")
                    if (!matchedPassword) return null;

                    return {
                        _id: user?._id,
                        email: user?.email,
                        imageUrl: user?.imageUrl,
                        name: `${user?.firstName} ${user?.lastName}`,
                        loginType: user?.loginType,
                        firstName: user?.firstName,
                        lastName: user?.lastName
                    } as User

                }
                catch (err) {
                    console.error(err)
                    if (err instanceof ValidationError) {
                        const errors = (err as ValidationError).inner;
                        console.error(errors)
                    }

                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {

            if (trigger === "update" && session?.user) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                token.user = session.user
            } else if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            const user = token?.user as Session["user"] | null

            if (user)
                session.user = user;

            return session;
        },

    }
}

export default NextAuth(authOptions)