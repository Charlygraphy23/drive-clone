import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { TRANSACTION_STATUS } from "@/app/lib/database/interfaces/transaction.interface";
import { PlanService } from "@/app/lib/database/services/plan.service";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { TransactionService } from "@/app/lib/database/services/transaction.service";
import { RazorpayServer } from "@/app/utils/razorpay/server";
import { ApiResponse } from "@/app/utils/response";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    await connectDB()
    const session = await mongoose.startSession();
    const planService = new PlanService()
    const subscriptionService = new SubscriptionService()
    const transactionService = new TransactionService()
    const response = new ApiResponse()

    try {

        session.startTransaction()
        const reqSession = await getServerSession(authOptions);
        const userId = reqSession?.user?._id as string

        const body = await req.json();
        const { planId } = body

        if (!planId) return response.status(422).send("Invalid planId")

        const [planDetails, subscriptionDetails] = await Promise.all([
            planService.getPlanById(planId, {
                session
            }),
            subscriptionService.getActiveSubscription(userId, { session })
        ])

        if (!planDetails) throw new Error(`Plan not found`);

        if (subscriptionDetails && !subscriptionDetails?.planDetails?.isFree) {
            return NextResponse.json({
                message: "Customer already has a subscription which is baught by the customer can not active free subscription!",
                data: null
            }, {
                status: 400
            })
        }

        // if(subscriptionDetails && subscriptionDetails?.planId.toString() === planDetails?._id?.toString()) {
        //     return NextResponse.json({
        //         message: "Customer can not purchase subscription ",
        //         data: null
        //     })
        // }

        if (!planDetails?.isFree) {
            const transaction = await transactionService.create({
                planDetails,
                status: TRANSACTION_STATUS.PENDING,
                userId
            }, {
                session,
            });

            const razorpay = await new RazorpayServer().createOrder({
                amount: transaction?.total * 100,
                notes: {
                    dbTransactionId: transaction?._id?.toString(),
                    planId,
                }
            })

            await session.commitTransaction();
            await session.endSession();
            revalidateTag("subscription")

            return NextResponse.json({
                message: "Done",
                data: {
                    razorpayOrderId: razorpay?.razorpayOrderId,
                    amount: razorpay?.amount,
                    currency: razorpay?.currency,
                    userId
                }
            })
        }

        const transaction = await transactionService.create({
            planDetails,
            status: TRANSACTION_STATUS.DONE,
            userId
        }, {
            session,
        });
        const transactionId = transaction?._id;

        console.log("transactionId", transactionId)

        await subscriptionService.activeNewSubscription({
            userId,
            transactionId,
            planId
        }, { session })

        await session.commitTransaction();
        await session.endSession();
        revalidateTag("plans")
        return NextResponse.json({
            message: "Done",
            data: null
        })
    }
    catch (err: any) {
        await session.abortTransaction();
        session.endSession()
        return NextResponse.json(err?.message, {
            status: 500
        })

    }
}