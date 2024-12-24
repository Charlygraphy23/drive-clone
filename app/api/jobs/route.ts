/** 
 * This is a CRON job route that is being triggered by QSTASH third party service {@link https://upstash.com/docs/qstash/overall/getstarted}
 * We have used QSTASH (Request Builder) {@link https://console.upstash.com/qstash?tab=details}
 * Free tire has Max Requests per Day - 500
 */

import { connectDB } from "@/app/lib/database/db";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { TRANSACTION_STATUS } from "@/app/lib/database/interfaces/transaction.interface";
import { AccessModal } from "@/app/lib/database/models/access";
import { FilesAndFolderModel } from "@/app/lib/database/models/filesAndFolders";
import { SubscriptionModel } from "@/app/lib/database/models/subscription";
import { PlanService } from "@/app/lib/database/services/plan.service";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { TransactionService } from "@/app/lib/database/services/transaction.service";
import { CRYPTO } from "@/app/utils/crypto";
import { LOCAL_S3 } from "@/app/utils/s3";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';


const handleFileDelete = async () => {
    const session = await mongoose.startSession();
    const LIMIT = 10


    try {
        const currentDate = new Date()
        const ids = [] as string[];
        const accessIds = [] as string[];

        session.startTransaction()

        const deletedResources = await FilesAndFolderModel.aggregate([
            {
                $match: {
                    deletedForever: true,
                    $expr: {
                        $or: [
                            { $lte: ["$pickedAtForDelete", new Date(new Date().setHours(currentDate.getHours() - 24))] },
                            { $eq: [{ $type: "$pickedAtForDelete" }, "missing"] },
                            { $lte: ["$pickedAtForDelete", null] }
                        ]
                    }
                }
            },

            {
                $lookup: {
                    from: "accesses",
                    let: { resourceId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$resourceId", "$$resourceId"]
                                }
                            }
                        },

                        {
                            $project: {
                                rootId: 1, createdFor: 1, accessType: 1, resourceId: 1, origin: 1
                            }
                        }
                    ],
                    as: "accesses"
                }
            },

            { $limit: LIMIT }

        ], {
            session,
            withDeleted: true
        })

        for await (const resource of deletedResources) {
            try {
                if (resource.dataType === DATA_TYPE.FOLDER) {
                    ids.push(resource?._id)
                } else if (resource?.key) {
                    const fileKey = CRYPTO.decryptTextFromBase64(resource?.key);
                    const s3 = new LOCAL_S3({
                        key: fileKey
                    });
                    await s3.delete()
                    ids.push(resource?._id)
                }
                accessIds.push(...resource?.accesses?.map((access: any) => access?._id) ?? [])
            } catch (err) {
                console.log(err)
                await FilesAndFolderModel.findByIdAndUpdate({ _id: resource._id }, {
                    pickedAtForDelete: new Date()
                }, { session, withDeleted: true })
            }
        }

        await Promise.all([
            AccessModal.deleteMany({ _id: { $in: accessIds } }, { session, withDeleted: true }),
            FilesAndFolderModel.deleteMany({ _id: { $in: ids } }, { session, withDeleted: true })
        ])

        await session.commitTransaction();
    }
    catch (err) {
        console.error(err)
        await session.abortTransaction()
        throw err
    }
    finally {
        await session.endSession()
    }
    return
}


const handleSubscription = async () => {
    const session = await mongoose.startSession();
    const service = new ResourceService()
    const planService = new PlanService()
    const subscriptionService = new SubscriptionService()
    const transactionService = new TransactionService()

    try {
        session.startTransaction()
        const expiredSubscription = await SubscriptionModel.find({
            endDate: { $lt: new Date(), $ne: null },
            "planDetails.isFree": false,
            isActive: true
        }, undefined, { session }).limit(50)

        const freePlan = await planService.getFreePlan({ session })

        console.log("Expired subscriptions", expiredSubscription?.length)

        for await (const subscription of expiredSubscription) {
            const consumedStorage = await service.getStorageConsumedByUser(String(subscription?.userId), { session })

            if (freePlan?.benefits?.maxSize > consumedStorage) {
                // This means user has consumed less storage than the free plan so we will active free plan

                const transaction = await transactionService.create({
                    planDetails: freePlan,
                    status: TRANSACTION_STATUS.DONE,
                    userId: String(subscription?.userId)
                }, {
                    session,
                });
                const transactionId = transaction?._id;

                console.log("transactionId", transactionId)
                await subscriptionService.activeNewSubscription({ planId: freePlan?._id, transactionId, userId: String(subscription?.userId) }, { session })
            }
            else {
                await SubscriptionModel.updateMany({
                    userId: subscription?.userId,
                    isActive: true
                }, { isActive: false }, { session })
            }
        }
        await session.commitTransaction();
    }
    catch (err) {
        console.error(err)
        await session.abortTransaction()
        throw err
    }
    finally {
        await session.endSession()
    }
    return
}

async function handler() {
    try {
        console.log("Trigger handler")
        await connectDB()


        handleSubscription().then(() => {
            console.log("Subscription details updated")
        }).catch(err => {
            console.error("Error while Subscription update", err)
        })

        handleFileDelete().then(() => {
            console.log("Resource deleted")
        }).catch(err => {
            console.error("Error while deleting resource", err)
        })
        return Response.json("Done")
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