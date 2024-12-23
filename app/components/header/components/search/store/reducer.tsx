import { ActionType } from "@/app/interfaces/index.interface";
import { FilterStateType, SearchReducerStateType } from "../interfaces/index.interface";
import { CLEAR_FILTER_BY_NAME, INVALIDATE_SEARCH, ON_SEARCH_CHANGE, SUBMIT_FILTERS, TOGGLE_FILTER_VIEW, TOGGLE_SEARCH_MODAL } from "./actions";


export const SearchReducerInitialState = {
    search: "",
    filters: {},
    isFilterShown: false,
    isOpen: false,
} as SearchReducerStateType

const searchReducer = (state = SearchReducerInitialState, action: ActionType) => {

    const { payload, type } = action;
    const newState = Object.assign({}, state)

    switch (type) {
        case SUBMIT_FILTERS:
            newState.filters = payload
            return newState

        case TOGGLE_SEARCH_MODAL:

            if (newState.isOpen) {
                return SearchReducerInitialState
            }
            newState.isOpen = typeof payload !== "undefined" ? payload : !newState.isOpen
            return newState

        case ON_SEARCH_CHANGE:
            newState.search = payload
            return newState


        case CLEAR_FILTER_BY_NAME:
            delete newState?.filters?.[payload as keyof FilterStateType]
            return newState

        case TOGGLE_FILTER_VIEW:
            newState.isFilterShown = typeof payload !== "undefined" ? payload : !newState.isFilterShown
            return newState

        case INVALIDATE_SEARCH: return SearchReducerInitialState;
        default:
            return newState
    }

}

export default searchReducer