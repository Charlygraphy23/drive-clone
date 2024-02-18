import { createContext } from "react";
import { SearchContextType } from "../interfaces/index.interface";


const initialState = {} as SearchContextType
export const SearchContext = createContext(initialState)