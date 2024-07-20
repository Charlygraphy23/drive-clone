import { PlanModel } from "../models/plans";

const Model = PlanModel

export class PlanService {
    getAllPlans() {
        return Model.aggregate([
            {
                $lookup: {
                    from: "benefits",
                    let: { benefitId: "$benefitId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$benefitId"] }
                            }
                        }
                    ],
                    as: "benefits"
                }
            },

            {
                $unwind: {
                    path: "$benefits",
                    preserveNullAndEmptyArrays: true
                }
            }
        ])
    }
}