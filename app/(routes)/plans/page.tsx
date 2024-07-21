import { authOptions } from "@/app/lib/authConfig";
import { BenefitsSchemaType } from "@/app/lib/database/interfaces/benefits.interface";
import { PlaneSchemaType } from "@/app/lib/database/interfaces/plan.interface";
import { PlanService } from "@/app/lib/database/services/plan.service";
import { getServerSession } from "next-auth";
import PlanCard from "./components/plan";
import style from "./style.module.scss";

const PlanPage = async () => {
    const session = await getServerSession(authOptions);
    const planService = new PlanService()
    const data = (await planService.getAllPlans())
    const plans = JSON.parse(JSON.stringify(data)) as Array<{ _id: string, benefits: BenefitsSchemaType } & PlaneSchemaType>

    return (
        <main className={style?.wrapper} style={!session?.user ? { height: "100vh" } : {}}>
            <h1>Our Plans</h1>
            <p>These are all the plans having it's own benefits</p>


            <div className={style?.plans}>
                {plans?.map(plan => <PlanCard
                    key={plan._id}
                    benefits={plan.benefits}
                    description={plan.description}
                    isActivated={false}
                    isPopular={plan.isPopular}
                    title={plan?.title}
                    price={plan?.price}
                    isAuthenticated={!!session?.user}
                />)}

            </div>

        </main>
    )
}

export default PlanPage