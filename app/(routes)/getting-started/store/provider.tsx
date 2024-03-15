"use client"

import { PropsWithChildren, useState } from 'react'
import { GetStartedContext } from '.'

const GetStartedProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState({
        activePage: 0,
        data: {} as Record<string, any>
    })

    const dispatch = (value: Record<string, any>) => {

        const newState = Object.assign({}, state);

        newState.data = {
            ...newState?.data,
            ...value
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
        <GetStartedContext.Provider value={{ state, dispatch, setPage }}>
            {children}
        </GetStartedContext.Provider>
    )
}

export default GetStartedProvider