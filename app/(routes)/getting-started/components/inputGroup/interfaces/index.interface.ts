import { boolean, object, string } from "yup";

export type SubmitParameterValueType = string | {
    value: string; showTerms: boolean
}

export const InputStateSchemaWithCheck = object({
    email: string().email().required(),
    checked: boolean().required()
});


// const schema = object().shape({
//   email: string().email().required(),
// });

// const schema = object().shape({
//     email: string().when('$email', {
//       is: (value) => {
//         return value;
//       },
//       then: () => string().required(),
//       otherwise: (...args) => {
//         console.log(args);
//         return string().notRequired();
//       },
//     }),
//   });

//   const data1 = {}; // Empty object
//   const data2 = { email: '' }; // Object with 'email' key

//   schema
//     .validate(data1, { context: { email: 'email' in data1 } })
//     .then(() => console.log('Validation successful for data1'))
//     .catch((error) => console.log('Validation failed for data1:', error.message));

//   schema
//     .validate(data1, { context: { email: 'email' in data2 } })
//     .then(() => console.log('Validation successful for data2'))
//     .catch((error) => console.log('Validation failed for data2:', error.message));


export type InputGroupStateType = {
    email?: string;
    checked?: boolean
}