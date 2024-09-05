import { passwordYupValidation } from "@/app/components/loginFlow/interfaces/index.interface";
import { object, ref, string } from "yup";

export const SignupSchemaValidator = object().shape({
    firstName: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required("Please provide your first name"),
    lastName: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required("Please provide your last name"),
    email: string().email("Please provide a valid email").required("Please provide your email address")
})


export const ForgotPasswordSchemaValidator = object().shape({
    email: string().email("Please provide a valid email").required("Please provide your email address")
})

export const ResetPasswordSchemaValidator = object().shape({
    newPassword: passwordYupValidation,
    confirmPassword: string().oneOf([ref("newPassword")], 'Passwords must match'),
    hash: string().required()
})