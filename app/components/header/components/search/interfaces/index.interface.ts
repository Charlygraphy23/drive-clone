import { ActionType } from "@/app/interfaces/index.interface"
import { Dayjs } from "dayjs"
import { Dispatch } from "react"

export type ResultType = "folder" | "pdf" | "txt" | "img"

export interface FilterStateType {
    createdAt: [typeof Dayjs, typeof Dayjs],
    exifDate: [typeof Dayjs, typeof Dayjs],
    type: string[],
    hashtags: string[]
}

export type SearchReducerStateType = {
    filters: FilterStateType,
    isFilterShown: boolean,
}

export type SearchContextType = {
    state: SearchReducerStateType,
    dispatch: Dispatch<ActionType>
}