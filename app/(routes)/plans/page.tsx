import { authOptions } from "@/app/lib/authConfig";
import { getServerSession } from "next-auth";
import PlanCard from "./components/plan";
import style from "./style.module.scss";

const plans = [
    {
        id: "plan-123",
        isActivated: true,
        isPopular: false,
        price: 0,
        title: "FREE",
        benefits: [
            "Access upto 1GB of free space",
            "100 downloads available per day"
        ],
        description: "This is a free plan"
    },
    {
        id: "plan-234",
        isActivated: false,
        isPopular: true,
        price: 49.50,
        title: "Starter",
        benefits: [
            "Access upto 5GB of free space",
            "200 downloads available per day"
        ],
        description: "This is a Starter plan"
    },
    {
        id: "plan-345",
        isActivated: false,
        isPopular: false,
        price: 99.50,
        title: "Premium",
        benefits: [
            "Access upto 20GB of free space",
            "500 downloads available per day"
        ],
        description: "This is a Premium plan"
    }
]


const PlanPage = async () => {
    const session = await getServerSession(authOptions);
    return (
        <main className={style?.wrapper} style={!session?.user ? { height: "100vh" } : {}}>
            <h1>Our Plans</h1>
            <p>These are all the plans having it's own benefits</p>


            <div className={style?.plans}>
                {plans?.map(plan => <PlanCard
                    key={plan.id}
                    benefits={plan.benefits}
                    description={plan.description}
                    isActivated={plan?.isActivated}
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