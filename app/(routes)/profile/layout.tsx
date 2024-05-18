import HeaderComponent from "@/app/components/header";
import PageLoader from "@/app/loading";
import RouteTemplate from "@/app/routeTemplate";
import { PropsWithChildren, Suspense } from "react";
import ProfileBackButton from "./components/backButton";
import style from "./style.module.scss";

const ProfileLayout = ({ children }: PropsWithChildren) => {
	return (
		<Suspense fallback={<PageLoader />}>
			<RouteTemplate>
				<div className={style.layout}>
					<header className='d-flex justify-content-between align-items-center mb-5'>
						<ProfileBackButton />
						<HeaderComponent hideSearch={true} />
					</header>

					<>
						{children}
					</>
				</div>
			</RouteTemplate>
		</Suspense>
	);
};

export default ProfileLayout;
