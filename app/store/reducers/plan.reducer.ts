import { GetPlanWithBenefitType } from "@/app/lib/database/interfaces/plan.interface";
import { createReducer } from "@reduxjs/toolkit";
import { addPlans } from "../actions/plan.actions";

const initialState = {
    data: [] as GetPlanWithBenefitType[],
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(addPlans, (state , action) => {
            state.data = action.payload
            return state;
        })
});
