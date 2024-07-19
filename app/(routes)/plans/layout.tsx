import HeaderComponent from "@/app/components/header";
import { authOptions } from "@/app/lib/authConfig";
import PageLoader from "@/app/loading";
import RouteTemplate from "@/app/routeTemplate";
import { getServerSession } from "next-auth";
import { PropsWithChildren, Suspense } from "react";

const PlanLayout = async ({ children }: PropsWithChildren) => {

    const session = await getServerSession(authOptions);

    if (!session?.user) return <Suspense fallback={<PageLoader />}>{children}</Suspense>
    return <Suspense fallback={<PageLoader />}>
        <RouteTemplate>
            <div className="d-flex flex-column h-100">
                <header className='d-flex justify-content-end align-items-center mb-3'>
                    <div className="d-flex align-items-center">
                        <HeaderComponent hideSearch={true} />
                    </div>
                </header>
                {children}
            </div>
        </RouteTemplate>
    </Suspense >;
};

export default PlanLayout;
