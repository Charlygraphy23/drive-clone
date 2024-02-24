import { ActionType } from "@/app/interfaces/index.interface";
import { SearchReducerStateType } from "../interfaces/index.interface";
import { SUBMIT_FILTERS, TOGGLE_FILTER_VIEW } from "./actions";


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

        case TOGGLE_FILTER_VIEW:
            newState.isFilterShown = !newState.isFilterShown
            return newState
        default:
            return newState
    }

}

export default searchReducer