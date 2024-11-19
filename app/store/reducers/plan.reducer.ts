import { GetPlanWithBenefitType } from "@/app/lib/database/interfaces/plan.interface";
import { createReducer } from "@reduxjs/toolkit";
import { activatePlan, addPlans } from "../actions/plan.actions";

const initialState = {
    data: [] as Array<{ isActivated?: boolean } & GetPlanWithBenefitType>,
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(addPlans, (state, action) => {
            state.data = action.payload
            return state;
        })
        .addCase(activatePlan, (state, action) => {
            const planId = action.payload
            state.data = state.data?.map((plan) => {
                if (plan._id === planId) {
                    plan.isActivated = true
                } else {
                    plan.isActivated = false
                }

                return plan
            })
            return state;
        })
});
