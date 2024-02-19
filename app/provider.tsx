"use client";

import makeStore, { AppStore } from "@app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from "antd";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export function StoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}

const AppClientProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					<ConfigProvider theme={{ token: { zIndexPopupBase: 1090 } }}>
						{children}
					</ConfigProvider></StoreProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
			<BootstrapClient />
		</>
	);
};

function BootstrapClient() {
	useEffect(() => {
		require("bootstrap");
	}, []);

	return null;
}

export default AppClientProvider;
