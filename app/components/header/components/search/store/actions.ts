import { ActionType } from "@/app/interfaces/index.interface";
import { FilterStateType } from "../interfaces/index.interface";

export const SUBMIT_FILTERS = "SUBMIT_FILTERS";
export const TOGGLE_FILTER_VIEW = "TOGGLE_FILTER_VIEW";
export const CLEAR_FILTER_BY_NAME = "CLEAR_FILTER_BY_NAME";
export const INVALIDATE_SEARCH = "INVALIDATE_SEARCH";
export const ON_SEARCH_CHANGE = "ON_SEARCH_CHANGE";
export const TOGGLE_SEARCH_MODAL = "TOGGLE_SEARCH_MODAL";


export const toggleSearchModal = (payload?: boolean): ActionType => {
    return {
        type: TOGGLE_SEARCH_MODAL,
        payload: payload
    }
}


export const toggleFilterView = (payload?: boolean): ActionType => {
    return {
        type: TOGGLE_FILTER_VIEW,
        payload: payload
    }
}

export const submitFilters = (value: FilterStateType): ActionType => {
    return {
        type: SUBMIT_FILTERS,
        payload: value
    }
}

export const clearFilterByName = (key: keyof FilterStateType): ActionType => {
    return {
        type: CLEAR_FILTER_BY_NAME,
        payload: key
    }
}


export const invalidateSearch = (): ActionType => {
    return {
        type: INVALIDATE_SEARCH,
    }
}

export const handleSearch = (search: string): ActionType => {
    return {
        type: ON_SEARCH_CHANGE,
        payload: search
    }
}