import { boolean, object, string } from "yup";

export type SubmitParameterValueType = string | {
    value: string; showTerms: boolean
}

export const InputGroupStateSchema = object({
    email: string().when([], {
        is(email: string) {
            return email !== undefined
        },
        then: string().email().required(),
        otherwise: string().email()
    }),
    checked: boolean()
});

export type InputGroupStateType = typeof InputGroupStateSchema