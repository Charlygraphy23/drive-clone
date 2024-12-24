import mongoose, { MongooseUpdateQueryOptions, SessionOption } from "mongoose";
import { RECURRING_TYPE } from "../interfaces/plan.interface";
import { ActiveNewSubscriptionType } from "../interfaces/subscription.interface";
import { TRANSACTION_STATUS } from "../interfaces/transaction.interface";
import { SubscriptionModel } from "../models/subscription";
import { PlanService } from "./plan.service";
import { ResourceService } from "./resource.service";
import { TransactionService } from "./transaction.service";

const Model = SubscriptionModel

export class SubscriptionService {
    private planService: PlanService
    private resourceService: ResourceService
    private transactionService: TransactionService


    constructor() {
        this.planService = new PlanService()
        this.resourceService = new ResourceService()
        this.transactionService = new TransactionService()
    }

    async activeNewSubscription({ userId, planId, transactionId }: ActiveNewSubscriptionType, options?: SessionOption) {
        const updateOptions = options as MongooseUpdateQueryOptions
        await Model.updateMany({ userId: new mongoose.Types.ObjectId(userId), isActive: true }, { isActive: false }, updateOptions);

        const [planDetails, userConsumedStorage, transactionDetails, lastTransactionByUser, lastUserSubscription] = await Promise.all([
            this.planService.getPlanById(planId, options),
            this.resourceService.getStorageConsumedByUser(userId, options),
            this.transactionService.getDetails(transactionId, options),
            this.transactionService.lastTransactionByUser(userId, options),
            this.getUserSubscription(userId, options)
        ]);

        if (!transactionId) throw new Error("The plan is not purchased yet!")
        if (String(transactionDetails?._id) !== String(lastTransactionByUser?._id)) throw new Error("Transaction details mismatched!")
        if (transactionDetails?.status !== TRANSACTION_STATUS.DONE) throw new Error("Invalid transaction data")
        if (!planDetails) throw new Error("No plan found");
        if (userConsumedStorage > planDetails?.benefits?.maxSize) throw new Error("You can't buy this plan, as you have consumed more storage than current plan.")
        if (planDetails?.isFree && lastUserSubscription?.planDetails?.isFree) throw new Error("Already activated")

        let endDate = null;

        if (!planDetails.isFree) {
            endDate = new Date();
            if (planDetails.recurringType === RECURRING_TYPE.MONTHLY) {
                endDate = new Date(new Date().setDate(endDate.getDate() + 30))
            }
            else if (planDetails.recurringType === RECURRING_TYPE.YEARLY) {
                endDate = new Date(new Date().setFullYear(endDate.getFullYear() + 1))
            }
        }


        const [subscriptionDetails] = await Model.create([{
            isActive: true,
            userId: new mongoose.Types.ObjectId(userId),
            planId: new mongoose.Types.ObjectId(planId),
            planDetails: {
                planType: planDetails?.planType,
                recurringType: planDetails?.recurringType,
                isFree: planDetails?.isFree,
                price: planDetails?.isFree,
                benefitId: planDetails?.benefitId,
                benefitDetails: {
                    maxSize: planDetails?.benefits?.maxSize,
                    downloads: planDetails?.benefits?.downloads,
                }
            },
            endDate,
            transactionId,
        }], options)

        return subscriptionDetails
    }

    async getUserSubscription(userId: string, options?: SessionOption) {
        const lastSubscription = await Model.findOne({ userId: new mongoose.Types.ObjectId(userId) }, undefined, options).sort({ createdAt: -1 });
        return lastSubscription
    }

    async activeInitialFreeSubscription(userId: string, options?: SessionOption) {
        console.log('Initial subscription being active')
        const userHadSubscription = await this.getUserSubscription(userId);
        if (userHadSubscription) throw new Error("User already had subscription!, not eligible for initial free subscription");

        const [freePlan] = await this.planService.getAllPlans([
            {
                $match: {
                    isFree: true
                }
            },
            {
                $limit: 1
            }
        ]);

        if (!freePlan) throw new Error("No Plan found!")

        const transaction = await this.transactionService.create({ planDetails: freePlan, status: TRANSACTION_STATUS.DONE, userId }, options)
        return await this.activeNewSubscription({ userId, planId: freePlan?._id?.toString(), transactionId: transaction?._id?.toString() }, options)
    }

    async getActiveSubscription(userId: string, options?: SessionOption) {
        const lastSubscription = await Model.findOne({ userId: new mongoose.Types.ObjectId(userId), isActive: true }, undefined, options);
        return lastSubscription
    }
}