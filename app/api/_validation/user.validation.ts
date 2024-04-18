import { object, string } from "yup";

export const SignupSchemaValidator = object().shape({
    firstName: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required(),
    lastName: string().matches(/^[a-zA-Z]+$/, 'Field must contain only alphabetic characters').required(),
    email: string().email().required()
})