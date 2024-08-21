import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { TRANSACTION_STATUS } from "@/app/lib/database/interfaces/transaction.interface";
import { PlanService } from "@/app/lib/database/services/plan.service";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { TransactionService } from "@/app/lib/database/services/transaction.service";
import { RazorPay_App } from "@/app/utils/razorpay";
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

        const planDetails = await planService.getPlanById(planId, {
            session
        })

        if (!planDetails) throw new Error(`Plan not found`);

        if (!planDetails?.isFree) {
            const transaction = await transactionService.create({
                planDetails,
                status: TRANSACTION_STATUS.PENDING,
                userId
            }, {
                session,
            });

            const razorpay = await RazorPay_App.server.createOrder({
                amount: transaction?.total,
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
                    currency: razorpay?.currency
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

        // await transactionService.updateStatus(transactionId, TRANSACTION_STATUS.DONE, {
        //     session
        // })
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


        // TODO: at the time of expiration
        // TODO:: need to check if there is any subscription active 
        // TODO: if yes then check is it free subscrion or paid
        // TODO: if free do nothing
        // TODO: if it's pain, then check check how much space user consumed if it's less than free allowed space then active the free subscription or else block the user from accessing the drive.
        // TODO: allow user only to buy a subscription depending on their consumed storage if consumed > 5g then can not buy lower plan than currrent plan.
        // await session.commitTransaction();
        // await session.endSession();
        // return NextResponse.json("This is free subscription")
    }
    catch (err: any) {
        await session.abortTransaction();
        session.endSession()
        return NextResponse.json(err?.message, {
            status: 500
        })

    }
}