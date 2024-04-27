import { connectDB } from "@/app/lib/database/db";
import { UserService } from "@/app/lib/database/services/user.service";
import { comparePasswordWithHash } from "@/app/lib/lib";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ValidationError } from "yup";
import { CredentialsType, credentialSchema } from "./interfaces/index.interface";



const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hrs
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
                        id: user?._id,
                        email: user?.email,
                        image: user?.imageUrl,
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
    callbacks: {
        async session({ session, user, token }) {
            console.log("session", { session, user, token })
            // TODO filter the session what actually needs to be passed
            return session
        },
        async jwt({ token }) {
            // console.log("jwt", { token })
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
