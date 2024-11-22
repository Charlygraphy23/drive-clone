import { TRANSACTION_STATUS } from "@/app/lib/database/interfaces/transaction.interface";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { TransactionService } from "@/app/lib/database/services/transaction.service";
import { RazorpayServer } from "@/app/utils/razorpay/server";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }

export const POST = async (req: NextRequest) => {

    try {
        const transactionService = new TransactionService()
        const subscriptionService = new SubscriptionService()

        const signature = req.headers.get("x-razorpay-signature");
        if (!signature) return new NextResponse(JSON.stringify({
            message: "Invalid signature",
            success: false
        }), {
            status: 400
        })
        const body = await req.json()
        console.log("body", body)

        const rp = new RazorpayServer()
        const isValid = await rp.verifyWebhookSignature(
            JSON.stringify(body),
            signature,
        );

        console.log("isValid", isValid)
        if (!isValid) return new NextResponse(JSON.stringify({
            message: "Invalid",
            success: false
        }), {
            status: 400
        })


        const result = body as {
            entity: 'event',
            account_id: string,
            event: 'payment.captured' | 'payment.failed' | "payment.authorized",
            contains: ['payment'],
            payload: { payment: { entity: any } },
            created_at: number
        }


        if (result?.event === "payment.authorized") {
            console.log("authorized event", result)
            return NextResponse.json(result)
        }


        if (result?.event === "payment.captured") {
            console.log("authorized event", result)
            console.log("captured event", result.payload.payment)

            const session = await mongoose.startSession();
            try {

                session.startTransaction();
                const entity = result.payload.payment?.entity
                await transactionService.updateTransactionWithPayload({
                    transactionId: entity?.notes?.dbTransactionId,
                    errorCode: entity?.error_code,
                    errorDescription: entity?.error_description,
                    orderId: entity?.order_id,
                    paymentId: entity?.id,
                    paymentSource: entity?.error_source,
                    acquirerData: entity?.acquirer_data
                }, TRANSACTION_STATUS.DONE, { session })

                await subscriptionService.activeNewSubscription({
                    userId: entity?.notes?.userId,
                    planId: entity?.notes?.planId,
                    transactionId: entity?.notes?.dbTransactionId
                }, { session })

                await session.commitTransaction();
                revalidateTag("plans")
                revalidateTag("subscription")

            }

            catch (err) {
                console.log("Error while updating transaction", err)
                await session.abortTransaction();
            }
            finally {
                await session.endSession()
            }
            return NextResponse.json({})
        }


        const entity = result.payload.payment?.entity
        await transactionService.updateTransactionWithPayload({
            transactionId: entity?.notes?.dbTransactionId,
            errorCode: entity?.error_code,
            errorDescription: entity?.error_description,
            orderId: entity?.order_id,
            paymentId: entity?.id,
            paymentSource: entity?.error_source
        }, TRANSACTION_STATUS.FAILED)
        revalidateTag("plans")
        revalidateTag("subscription")
        return NextResponse.json(result)
    }
    catch (err: any) {
        return NextResponse.json(err?.message, {
            status: 500
        })
    }
}