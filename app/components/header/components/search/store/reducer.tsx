import { ActionType } from "@/app/interfaces/index.interface";
import { FilterStateType, SearchReducerStateType } from "../interfaces/index.interface";
import { CLEAR_FILTER_BY_NAME, INVALIDATE_SEARCH, ON_SEARCH_CHANGE, SUBMIT_FILTERS, TOGGLE_FILTER_VIEW, TOGGLE_SEARCH_MODAL } from "./actions";


const initialState = {
    search: "",
    filters: {},
    isFilterShown: false,
    isOpen: false
} as SearchReducerStateType

const searchReducer = (state = initialState, action: ActionType) => {

    const { payload, type } = action;
    const newState = Object.assign({}, state)

    switch (type) {
        case SUBMIT_FILTERS:
            newState.filters = payload
            return newState

        case TOGGLE_SEARCH_MODAL:

            if (newState.isOpen) {
                return initialState
            }
            newState.isOpen = !newState.isOpen
            return newState

        case ON_SEARCH_CHANGE:
            newState.search = payload
            return newState


        case CLEAR_FILTER_BY_NAME:
            delete newState?.filters?.[payload as keyof FilterStateType]
            return newState

        case TOGGLE_FILTER_VIEW:
            newState.isFilterShown = !newState.isFilterShown
            return newState

        case INVALIDATE_SEARCH: return initialState;
        default:
            return newState
    }

}

export default searchReducer