import { getSubscriptionInfo } from "@/app/_actions/plans";
import { authOptions } from "@/app/lib/authConfig";
import { getServerSession, User } from "next-auth";
import FooterComponent from "../getting-started/components/footer";
import GettingStartedHeader from "../getting-started/components/header";
import PlanList from "./components/list";
import PlanStateProvider from "./provider";
import style from "./style.module.scss";

const PlanPage = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user as User
    const subscription = await getSubscriptionInfo(String(user?._id ?? ""));


    return (
        <PlanStateProvider>
            <section className={`${style?.wrapper}`} style={!session?.user ? { height: "100vh" } : {}}>
                {!user && <div className={style.header}>
                    <GettingStartedHeader user={user} hidePrice />
                </div>}

                <h1>Our Plans</h1>
                <p>These are all the plans having its own benefits</p>
                <PlanList subscription={subscription} user={user} />

                <FooterComponent hidePlans />
            </section>
        </PlanStateProvider>
    )
}

export default PlanPage


