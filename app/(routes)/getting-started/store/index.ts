import { createContext } from "react";


const initialState = {} as {
    state: {
        activePage: number,
        data: Record<string, unknown>
    }, dispatch: (_value: Record<string, unknown>) => void, setPage: (_page: number) => void, onChange: (_key: string, _value?: string | number | boolean) => void
}

export const GetStartedContext = createContext(initialState)