
import { PropsWithChildren, useReducer } from 'react'
import { SearchReducerStateType } from '../interfaces/index.interface'
import { SearchContext } from './context'
import searchReducer from './reducer'


const SearchStateProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(searchReducer, {} as SearchReducerStateType)
    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchStateProvider