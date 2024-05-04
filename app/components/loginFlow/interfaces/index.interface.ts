import { Dispatch, SetStateAction } from "react";
import { object, string } from "yup";

interface ViewPagePropsType {
    title: string;
    submitText: string;
    active: number;
    onNext: () => void;
    index: number;
    goBack: (_number?: number) => void;
    value: LoginFlowState;
    setState: Dispatch<SetStateAction<LoginFlowState>>
}


const EmailValidationSchema = string().email("In-valid Email format").required("Please enter a valid email")

export type EmailPasswordPropsType = {
    rememberMe?: boolean;
} & ViewPagePropsType

export type ForgotPasswordPropsType = ViewPagePropsType

export type EmailSendSuccessPropsType = {
    onClear?: () => void
} & Pick<ViewPagePropsType, "submitText" | "active" | "index" | "goBack">

export type LoginFlowState = {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export const passwordYupValidation = string().required("Please enter password").min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\]=])[A-Za-z\d@$!%*?&\]=]{8,}$/, 'Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 special character.')


export const EmailPasswordSchema = object().shape({
    email: EmailValidationSchema,
    password: passwordYupValidation,
})

export const ForgotPasswordSchema = object().shape({
    email: EmailValidationSchema
})