import mongoose, { PipelineStage, SessionOption } from "mongoose";
import { BenefitsSchemaType } from "../interfaces/benefits.interface";
import { GetPlanWithBenefitType, PlanSchemaType } from "../interfaces/plan.interface";
import { PlanModel } from "../models/plans";

const Model = PlanModel

export class PlanService {
    private benefitQuery: PipelineStage[] = [
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
    ]

    async getAllPlans(filterArr: PipelineStage[] = [] as PipelineStage[], options?: SessionOption) {
        const planArr = await Model.aggregate([
            ...filterArr,
            ...this.benefitQuery
        ], options)

        return planArr as GetPlanWithBenefitType[]
    }

    async getPlanById(planId: string, option?: SessionOption): Promise<{ _id: string, benefits: { _id: string } & BenefitsSchemaType } & PlanSchemaType> {
        const planArr = await Model.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(planId)
                }
            },
            ...this.benefitQuery,
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 1
            }
        ], option);
        return planArr?.[0] as GetPlanWithBenefitType
    }

    async getFreePlan(option?: SessionOption): Promise<{ _id: string, benefits: { _id: string } & BenefitsSchemaType } & PlanSchemaType> {
        const planArr = await Model.aggregate([
            {
                $match: {
                    isFree: true
                }
            },
            ...this.benefitQuery,
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 1
            }
        ], option);
        return planArr?.[0] as GetPlanWithBenefitType
    }
}