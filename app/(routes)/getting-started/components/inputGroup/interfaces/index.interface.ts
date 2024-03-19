import { boolean, object, string } from "yup";

export type SubmitParameterValueType = string | {
    value: string; showTerms: boolean
}

export const InputStateSchema = object().shape({
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

    firstName: string().when("$firstName", {
        is: (value: boolean) => !!value,
        then: () => string().required(),
        otherwise: () => string().notRequired()
    }),

    lastName: string().when("$lastName", {
        is: (value: boolean) => !!value,
        then: () => string().required(),
        otherwise: () => string().notRequired()
    }),
});



export type InputGroupStateType = {
    email?: string;
    checked?: boolean
} 