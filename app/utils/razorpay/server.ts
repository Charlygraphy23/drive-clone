'use server';
import { CreateOrderRazorpay, VerifyRazorPayPaymentSignature } from '@/app/interfaces/razorpay.interface';
import Razorpay from 'razorpay';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

export class RazorpayServer {
    instance: Razorpay

    constructor() {
        this.instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
    }


    async createOrder({ amount, notes }: CreateOrderRazorpay) {
        const order = await this.instance.orders.create({
            amount,
            currency: "INR",
            notes
        })

        return {
            razorpayOrderId: order?.id,
            currency: order?.currency,
            amount: order?.amount
        }
    }

    async verifyPaymentSignature({
        razorpay_order_id, razorpay_payment_id, razorpay_signature
    }: VerifyRazorPayPaymentSignature) {
        return validatePaymentVerification({
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id
        }, razorpay_signature, process.env.RAZORPAY_SECRET_KEY)
    }
}