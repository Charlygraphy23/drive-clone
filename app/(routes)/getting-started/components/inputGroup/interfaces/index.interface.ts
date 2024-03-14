import { boolean, object, string } from "yup";

export type SubmitParameterValueType = string | {
    value: string; showTerms: boolean
}

export const InputStateSchemaObjectWithCheck = object().shape({
    email: string().when("$email", {
        is: (value: boolean) => !!value,
        then: () => string().email().required(),
        otherwise: () => string().notRequired()
    }),
    checked: boolean().when("$checked", {
        is: (value: boolean) => !!value,
        then: () => boolean().required().isTrue(),
        otherwise: () => boolean().notRequired()
    }),
});

export const InputStateSchemaWithCheck = string().required()


export type InputGroupStateType = {
    email?: string;
    checked?: boolean
} 