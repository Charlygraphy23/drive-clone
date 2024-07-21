import mongoose, { SessionOption } from "mongoose";
import { BenefitsSchemaType } from "../interfaces/benefits.interface";
import { PlaneSchemaType } from "../interfaces/plan.interface";
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

    async getPlanById(planId: string, option?: SessionOption): Promise<{ _id: string, benefits: { _id: string } & BenefitsSchemaType } & PlaneSchemaType> {
        const planArr = await Model.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(planId)
                }
            },
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
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 1
            }
        ], option);
        return planArr?.[0]
    }
}