import { ActionType } from "@/app/interfaces/index.interface";
import { FilterStateType, SearchReducerStateType } from "../interfaces/index.interface";
import { CLEAR_FILTER_BY_NAME, SUBMIT_FILTERS, TOGGLE_FILTER_VIEW } from "./actions";


const initialState = {
    filters: {},
    isFilterShown: false
} as SearchReducerStateType

const searchReducer = (state = initialState, action: ActionType) => {

    const { payload, type } = action;
    const newState = Object.assign({}, state)

    switch (type) {
        case SUBMIT_FILTERS:
            newState.filters = payload
            return newState


        case CLEAR_FILTER_BY_NAME:
            delete newState?.filters?.[payload as keyof FilterStateType]
            return newState

        case TOGGLE_FILTER_VIEW:
            newState.isFilterShown = !newState.isFilterShown
            return newState
        default:
            return newState
    }

}

export default searchReducer