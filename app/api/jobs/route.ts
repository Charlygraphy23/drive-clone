/** 
 * This is a CRON job route that is being triggered by QSTASH third party service {@link https://upstash.com/docs/qstash/overall/getstarted}
 * We have used QSTASH (Request Builder) {@link https://console.upstash.com/qstash?tab=details}
 * Free tire has Max Requests per Day - 500
 */

import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

export const dynamic = 'force-dynamic';

async function handler() {
    try {

        const result = "Helo, World! This is CRON route."
        console.log("Cron Triggered")

        // TODO fetch job by 50 batch jobs 
        // TODO excute them one by one

        return Response.json({ data: result })
    }
    catch (err: any) {
        const error = err?.message
        console.error(err)
        return Response.json(error, {
            status: 500
        })
    }
}
export const POST = verifySignatureAppRouter(handler);