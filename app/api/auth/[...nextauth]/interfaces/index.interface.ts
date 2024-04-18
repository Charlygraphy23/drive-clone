import { passwordYupValidation } from "@/app/components/loginFlow/interfaces/index.interface";
import { object, string } from "yup";

export type CredentialsType = {
    email: string;
    password: string;
    callbackUrl: string;
    redirect: string;
    csrfToken: string;
    json: string;
}

export const credentialSchema = object().shape({
    email: string().email().required(),
    password: passwordYupValidation
})