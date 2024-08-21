export type CreateOrderRazorpay = {
    amount: number,
    notes: {
        dbTransactionId: string,
        planId: string
    }
}

export type VerifyRazorPayPaymentSignature = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}