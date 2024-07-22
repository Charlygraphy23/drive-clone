import mongoose, { MongooseUpdateQueryOptions, SessionOption } from "mongoose";
import { ORDER_STATUS } from "../interfaces/order.interface";
import { RECURRING_TYPE } from "../interfaces/plan.interface";
import { ActiveNewSubscriptionType } from "../interfaces/subscription.interface";
import { SubscriptionModel } from "../models/subscription";
import { OrderService } from "./order.service";
import { PlanService } from "./plan.service";
import { ResourceService } from "./resource.service";

const Model = SubscriptionModel

export class SubscriptionService {
    private planService: PlanService
    private resourceService: ResourceService
    private orderService: OrderService


    constructor() {
        this.planService = new PlanService()
        this.resourceService = new ResourceService()
        this.orderService = new OrderService()
    }

    async activeNewSubscription({ userId, planId, orderId }: ActiveNewSubscriptionType, options?: SessionOption) {
        const updateOptions = options as MongooseUpdateQueryOptions
        await Model.updateMany({ userId: new mongoose.Types.ObjectId(userId), isActive: true }, { isActive: false }, updateOptions);

        const [planDetails, userConsumedStorage] = await Promise.all([
            this.planService.getPlanById(planId, options),
            this.resourceService.getStorageConsumedByUser(userId, options)
        ]);

        if (!planDetails?.isFree && !orderId) throw new Error("The plan is not purchased yet!")

        if (orderId) {
            const orderDetails = await this.orderService.getOrderDetails(orderId, options);
            console.log("orderDetails", orderDetails)

            if (orderDetails?.orderStatus !== ORDER_STATUS.DONE && orderDetails?._id?.toString?.() !== orderId) throw new Error("Invalid order data")
        }

        if (!planDetails) throw new Error("No plan found");
        if (userConsumedStorage > planDetails?.benefits?.maxSize) throw new Error("You can't buy this plan, as you have consumed more storage than current plan.")

        let endDate = new Date();

        if (planDetails.recurringType === RECURRING_TYPE.MONTHLY) {
            endDate = new Date(new Date().setDate(endDate.getDate() + 30))
        }
        else if (planDetails.recurringType === RECURRING_TYPE.YEARLY) {
            endDate = new Date(new Date().setFullYear(endDate.getFullYear() + 1))
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
            endDate: !planDetails?.isFree ? endDate : null,
            orderId: !planDetails?.isFree ? orderId : null,
        }], options)

        return subscriptionDetails
    }

    // async subscribeToPlan(userId: string) {
    //     const subscription = await this.getUserSubscription(userId);

    //     if (subscription) {


    //         if (subscription?.isActive) {
    //             // TODO: 
    //             return subscription
    //         }
    //     }

    //     if (!subscription) throw new Error("Plan not found!")
    //     // check the eligibility

    //     const storageConsumed = await this.resourceService.getTotalStorageConsumed(userId);

    //     if (storageConsumed <= freeActivePlan?.benefits?.maxSize) {
    //         // then allow free subscriptions if the user hasn't exceeded the limit of the free subscriptions;
    //         const plan = {
    //             planId: freeActivePlan?._id,
    //             planType: freeActivePlan?.planType,
    //             recurringType: freeActivePlan?.recurringType,
    //             isFree: freeActivePlan?.isFree,
    //             price: freeActivePlan?.price,
    //             benefitId: freeActivePlan?.benefitId,
    //             maxSize: freeActivePlan?.benefits?.maxSize,
    //             downloads: freeActivePlan?.benefits?.downloads,
    //         } as ActiveNewSubscriptionType["plan"]
    //         return await this.activeNewSubscription({ userId, plan })
    //     }
    // }

    async getUserSubscription(userId: string) {
        const lastSubscription = await Model.findOne({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
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

        return await this.activeNewSubscription({ userId, planId: freePlan?._id?.toString() }, options)
    }
}