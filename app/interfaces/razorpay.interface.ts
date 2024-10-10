export type CreateOrderRazorpay = {
    amount: number,
    notes: RazorpayNotes
}

export type VerifyRazorPayPaymentSignature = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export type RazorpayNotes = {
    planId: string,
    dbTransactionId: string,
    razorpayOrderId?: string,
    amount?: string,
    currency?: 'INR'
}