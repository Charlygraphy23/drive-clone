import { createContext } from "react";


const initialState = {} as {
    state: {
        activePage: number,
        data: Record<string, any>
    }, dispatch: (value: Record<string, any>) => void, setPage: (page: number) => void, onChange: (key: string, value?: string | number | boolean,) => void
}

export const GetStartedContext = createContext(initialState)