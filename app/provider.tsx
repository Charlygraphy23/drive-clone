"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore } from "@app/store";
import makeStore from "@app/store";

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
		<div>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>{children}</StoreProvider>
			</QueryClientProvider>
			<BootstrapClient />
		</div>
	);
};

function BootstrapClient() {
	useEffect(() => {
		require("bootstrap");
	}, []);

	return null;
}

export default AppClientProvider;
