import { ActionType } from "@/app/interfaces/index.interface"
import { Dayjs } from "dayjs"
import { Dispatch } from "react"


export interface FilterStateType {
    createdAt: [typeof Dayjs, typeof Dayjs],
    exifDate: [typeof Dayjs, typeof Dayjs],
    type: string[],
    hashtags: string[]
}

export type SearchReducerStateType = {
    filters: FilterStateType,
    isFilterShown: boolean,
    search: string
    isOpen: boolean
}

export type SearchContextType = {
    state: SearchReducerStateType,
    dispatch: Dispatch<ActionType>
}