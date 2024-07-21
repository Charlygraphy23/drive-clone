import { connectDB } from "@/app/lib/database/db";
import { ORDER_TYPE } from "@/app/lib/database/interfaces/order.interface";
import { RECURRING_TYPE } from "@/app/lib/database/interfaces/plan.interface";
import { OrderModel } from "@/app/lib/database/models/order";
import { PlanModel } from "@/app/lib/database/models/plans";
import { SubscriptionModal } from "@/app/lib/database/models/subscription";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


const sleep = async (sec: number) => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(true)
        }, 1000 * sec)
    })
}

export const GET = async () => {
    const userId = "662cf46427dadd5aab49e7a5";
    const planId = "669b6ec91b9d15ac184f0e13";

    await connectDB()
    const session = await mongoose.startSession();

    try {

        session.startTransaction()
        const planDetails = await PlanModel.findOne({ _id: new mongoose.Types.ObjectId(planId) }, {}, {
            session
        }).populate("benefitId")

        if (!planDetails) throw new Error(`Plan not found`);

        if (!planDetails?.isFree) {
            const [order] = await OrderModel.create([{
                planId: planDetails?._id,
                subTotal: planDetails?.price,
                total: planDetails?.price,
                tax: 0,
                orderType: ORDER_TYPE.PENDING
            }], {
                session,
            });

            const orderId = order?._id;

            await sleep(5);

            await OrderModel.findByIdAndUpdate({
                _id: orderId,
            }, {
                orderType: ORDER_TYPE.DONE
            }, {
                session
            })

            let endDate = new Date();

            if (planDetails.recurringType === RECURRING_TYPE.MONTHLY) {
                endDate = new Date(new Date().setDate(endDate.getDate() + 30))
            }
            else if (planDetails.recurringType === RECURRING_TYPE.YEARLY) {
                endDate = new Date(new Date().setFullYear(endDate.getFullYear() + 1))
            }


            await SubscriptionModal.updateMany({ userId: new mongoose.Types.ObjectId(userId), isActive: true }, { isActive: true })
            await SubscriptionModal.create([{
                isActive: true,
                userId: new mongoose.Types.ObjectId(userId),
                planId: planDetails?._id,
                planDetails: {
                    planType: planDetails.planType,
                    recurringType: planDetails?.recurringType,
                    isFree: planDetails?.isFree,
                    price: planDetails?.price,
                    benefitId: planDetails?.benefitId,
                    benefitDetails: {
                        maxSize: planDetails?.benefitId?.maxSize,
                        downloads: planDetails?.benefitId?.downloads
                    }
                },
                endDate,
                orderId
            }], { session })

            await session.commitTransaction();
            await session.endSession();
            return NextResponse.json("Done")
        }

        // TODO: at the time of expiration
        // TODO:: need to check if there is any subscription active 
        // TODO: if yes then check is it free subscrion or paid
        // TODO: if free do nothing
        // TODO: if it's pain, then check check how much space user consumed if it's less than free allowed space then active the free subscription or else block the user from accessing the drive.
        // TODO: allow user only to buy a subscription depending on their consumed storage if consumed > 5g then can not buy lower plan than currrent plan.
        await session.commitTransaction();
        await session.endSession();
        return NextResponse.json("This is free subscription")
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession()
        return NextResponse.json(err?.message, {
            status: 500
        })

    }
}