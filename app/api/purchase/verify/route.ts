import { RazorpayNotes } from "@/app/interfaces/razorpay.interface";
import { RazorpayServer } from "@/app/utils/razorpay/server";
import { NextRequest, NextResponse } from "next/server";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }

export const POST = async (req: NextRequest) => {

    try {

        const signature = req.headers.get("x-razorpay-signature");
        console.log("Signature", signature)
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


        const data = body as {
            account_id: string,
            event: 'payment.authorized' | 'payment.captured',
            payment: {
                entity: {
                    id: string,
                    entity: 'payment',
                    amount: number,
                    currency: 'INR',
                    status: 'captured' | 'authorized',
                    order_id: string,
                    captured: boolean,
                    notes: RazorpayNotes,
                }

            }
        }


        if (data?.event === "payment.authorized") {
            console.log("authorized event", data)
            return NextResponse.json(data)
        }

        console.log("Captured event", data)
        return NextResponse.json(data)
    }
    catch (err: any) {
        return NextResponse.json(err?.message, {
            status: 500
        })
    }
}