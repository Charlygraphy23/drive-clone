"use client"

import { PropsWithChildren, useState } from 'react'
import { GetStartedContext } from '.'

const initialData = {
    email: "",
    checked: false,
    firstName: "",
    lastName: ""
}

const GetStartedProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState({
        activePage: -1,
        data: initialData
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

    const resetData = () => {
        setState(prev => ({
            ...prev,
            data: initialData
        }))
    }

    return (
        <GetStartedContext.Provider value={{ state, dispatch, setPage, onChange, resetData }}>
            {children}
        </GetStartedContext.Provider>
    )
}

export default GetStartedProvider