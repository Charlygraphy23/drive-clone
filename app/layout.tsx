import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import "nprogress/nprogress.css";
import TopBarLoader from "./components/loader/topbarLoader";
import "./globals.scss";
import AppClientProvider from "./provider";


export const metadata: Metadata = {
	title: "MBOX (A file storage)",
	description: "Free file storage",
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#6a29ff" },
		{ media: "(prefers-color-scheme: light)", color: "#6a29ff" }
	],
	colorScheme: "light",
	creator: "Dipta Biswas",
	publisher: "Dipta Biswas",
	icons: [
		{ rel: "icon", url: "/assets/favicon-32x32.png", sizes: "32x32" },
		{ rel: "icon", url: "/assets/favicon-16x16.png", sizes: "16x16" },
		{ rel: "apple-touch-icon", url: "/assets/apple-touch-icon.png", sizes: "180x180" },
	]
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>

			<body suppressHydrationWarning={true}>
				<TopBarLoader />
				{/* <NextTopLoader color="#6a29ff" /> */}
				<AppClientProvider>
					{children}
				</AppClientProvider>
			</body>
		</html>
	);
}
