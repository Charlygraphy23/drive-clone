import { ActionType } from "@/app/interfaces/index.interface";
import { FilterStateType } from "../interfaces/index.interface";

export const SUBMIT_FILTERS = "SUBMIT_FILTERS";
export const TOGGLE_FILTER_VIEW = "TOGGLE_FILTER_VIEW";


export const toggleFilterView = (): ActionType => {
    return {
        type: TOGGLE_FILTER_VIEW,
        payload: {}
    }
}

export const submitFilters = (value: FilterStateType): ActionType => {
    return {
        type: SUBMIT_FILTERS,
        payload: value
    }
}