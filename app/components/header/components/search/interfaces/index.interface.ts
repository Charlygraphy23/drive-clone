import { ActionType } from "@/app/interfaces/index.interface"
import { Dispatch } from "react"

export type ResultType = "folder" | "pdf" | "txt" | "img"

export type SearchReducerStateType = {
    filters: {}
}

export type SearchContextType = {
    state: SearchReducerStateType,
    dispatch: Dispatch<ActionType>
}