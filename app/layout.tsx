import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import Head from "next/head";
import "nprogress/nprogress.css";
import TopBarLoader from "./components/loader/topbarLoader";
import "./globals.scss";
import AppClientProvider from "./provider";

export const metadata: Metadata = {
	title: "MBOX (A file storage)",
	description: "Free file storage",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
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
