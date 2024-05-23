import { object, string } from "yup";

export const SignupSchemaValidator = object().shape({
    firstName: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required("Please provide your first name"),
    lastName: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required("Please provide your last name"),
    email: string().email("Please provide a valid email").required("Please provide your email address")
})