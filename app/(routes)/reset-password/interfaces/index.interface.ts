import { passwordYupValidation } from "@/app/components/loginFlow/interfaces/index.interface";
import { object } from "yup";

export type PasswordChangeFormStateType = {
    newPassword: string;
    confirmPassword: string;
}

export type PasswordChangeFormErrorStatType = Record<keyof PasswordChangeFormStateType, boolean>

export const PasswordChangeFormSchema = object().shape({
    newPassword: passwordYupValidation,
    confirmPassword: passwordYupValidation
})