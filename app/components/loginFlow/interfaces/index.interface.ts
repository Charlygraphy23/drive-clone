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

export const passwordYupValidation = string().required("No password provided!").min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z,0-9\d@$!%*#?&]/, "Password must be contain at least one alphanumeric character")


export const EmailPasswordSchema = object().shape({
    email: string().email().required(),
    password: passwordYupValidation,
})

export const ForgotPasswordSchema = object().shape({
    forgotEmail: string().email().required(),

})