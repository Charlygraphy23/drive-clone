import { createContext } from "react";


export type GettingStartedDataType = {
    email: string,
    checked: boolean,
    firstName: string,
    lastName: string
}

const initialState = {} as {
    state: {
        activePage: number,
        data: GettingStartedDataType
    }, dispatch: (_value: GettingStartedDataType) => void, setPage: (_page: number) => void, onChange: (_key: string, _value?: string | number | boolean) => void, resetData: () => void
}

export const GetStartedContext = createContext(initialState)