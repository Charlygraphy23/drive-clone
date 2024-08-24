'use client';

export class RazorpayClient {
    instance: typeof window.Razorpay

    constructor(options: Record<string, any>) {
        this.instance = new window.Razorpay({
            ...options,
            key: process.env.RAZORPAY_KEY_ID,
        })
    }
}