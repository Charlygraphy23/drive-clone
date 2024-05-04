import { passwordYupValidation } from "@/app/components/loginFlow/interfaces/index.interface";
import { object, ref, string } from "yup";

export type PasswordChangeFormStateType = {
    newPassword: string;
    confirmPassword: string;
}

export type PasswordChangeFormErrorStatType = Record<keyof PasswordChangeFormStateType, string>

export const PasswordChangeFormSchema = object().shape({
    newPassword: passwordYupValidation,
    confirmPassword: string().oneOf([ref("newPassword")], 'Passwords must match')
})