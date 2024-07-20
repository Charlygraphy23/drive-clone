import { NextResponse } from "next/server"


export const GET = async () => {

    // await PlanModel.create({
    //     title: "FREE",
    // })

    // await connectDB()
    // await PlanModel.create({
    //     isPopular: true,
    //     price: 99,
    //     title: "Premium",
    //     description: "This is a Premium plan",
    //     benefitId: new mongoose.Types.ObjectId("669b6cec1b9d15ac184f0e0f"),
    //     planType: PLAN_TYPE.RECURRING,
    //     isFree: false,
    //     recurringType: RECURRING_TYPE.MONTHLY
    // })
    return NextResponse.json("Done")

}