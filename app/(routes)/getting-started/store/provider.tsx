"use client"

import { PropsWithChildren, useState } from 'react'
import { GetStartedContext } from '.'

const GetStartedProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState({
        activePage: -1,
        data: {
            email: "",
            checked: false,
            firstName: "",
            lastName: ""
        }
    })

    const dispatch = (value: Record<string, unknown>) => {

        const newState = Object.assign({}, state);

        newState.data = {
            ...newState?.data,
            ...value
        }
        setState(newState)
    }

    const onChange = (key: string, value?: string | number | boolean,) => {

        const newState = Object.assign({}, state);

        newState.data = {
            ...newState?.data,
            [key]: value
        }
        setState(newState)
    }

    const setPage = (page: number) => {
        setState(prev => ({
            ...prev,
            activePage: page
        }))
    }

    return (
        <GetStartedContext.Provider value={{ state, dispatch, setPage, onChange }}>
            {children}
        </GetStartedContext.Provider>
    )
}

export default GetStartedProvider