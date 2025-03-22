import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import "nprogress/nprogress.css";
import { getUserInfo } from "./_actions/user";
import TopBarLoader from "./components/loader/topbarLoader";
import "./globals.scss";
import { authOptions } from "./lib/authConfig";
import { ProfileProvider } from "./profileProvider";
import AppClientProvider from "./provider";

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#6a29ff" },
		{ media: "(prefers-color-scheme: light)", color: "#6a29ff" }
	],
	colorScheme: "light",
}


export const metadata: Metadata = {
	title: "MBOX (A file storage)",
	description: "Free file storage",
	creator: "Dipta Biswas",
	publisher: "Dipta Biswas",
	icons: [
		{ rel: "icon", url: "/assets/favicon-32x32.png", sizes: "32x32" },
		{ rel: "icon", url: "/assets/favicon-16x16.png", sizes: "16x16" },
		{ rel: "apple-touch-icon", url: "/assets/apple-touch-icon.png", sizes: "180x180" },
	]
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions)
	const userId = session ? String(session.user?._id) : ""
	const user = await getUserInfo(userId)

	return (
		<html lang='en'>
			<body suppressHydrationWarning={true}>
				<TopBarLoader />
				{/* <NextTopLoader color="#6a29ff" /> */}
				<AppClientProvider>
					<ProfileProvider userInfo={user}>
						{children}
					</ProfileProvider>
				</AppClientProvider>
			</body>
		</html>
	);
}
