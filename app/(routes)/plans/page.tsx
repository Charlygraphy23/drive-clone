import { getSubscriptionInfo } from "@/app/_actions/plans";
import { authOptions } from "@/app/lib/authConfig";
import { getServerSession, User } from "next-auth";
import PlanList from "./components/list";
import PlanStateProvider from "./provider";
import style from "./style.module.scss";

const PlanPage = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user as User
    const subscription = await getSubscriptionInfo(String(user?._id ?? ""));


    return (
        <PlanStateProvider>
            <main className={style?.wrapper} style={!session?.user ? { height: "100vh" } : {}}>
                <h1>Our Plans</h1>
                <p>These are all the plans having it's own benefits</p>
                <PlanList subscription={subscription} user={user} />
            </main>
        </PlanStateProvider>
    )
}

export default PlanPage


