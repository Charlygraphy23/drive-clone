import { ActionType } from "@/app/interfaces/index.interface";
import { SearchReducerStateType } from "../interfaces/index.interface";
import { SUBMIT_FILTERS } from "./actions";

const initialState = {
    filters: {}
} as SearchReducerStateType

const searchReducer = (state = initialState, action: ActionType) => {

    const { payload, type } = action;
    const newState = Object.assign({}, state)

    switch (type) {
        case SUBMIT_FILTERS:
            newState.filters = payload
            return newState
        default:
            return newState
    }

}

export default searchReducer