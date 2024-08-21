import { GetPlanWithBenefitType } from "@/app/lib/database/interfaces/plan.interface";
import { createAction } from "@reduxjs/toolkit";


// export const allPlans = createAsyncThunk<GetPlanWithBenefitType[]>("addPlans", async (_, _thunkAPI) => {
//     try {
//         const plans = await getPlans()
//         return plans as GetPlanWithBenefitType[]
//     }
//     catch (err) {
//         const errors = ErrorHandler(err)
//         _thunkAPI.rejectWithValue(errors)
//         return Promise.reject(errors)
//     }
// })

export const addPlans = createAction<GetPlanWithBenefitType[]>("addPlans");
export const activatePlan = createAction<string>("activatePlan");
