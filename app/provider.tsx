"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, {
	PropsWithChildren,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import { Provider } from "react-redux";
import store, { AppStore } from "@app/store";
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
		<QueryClientProvider client={queryClient}>
			<StoreProvider>{children}</StoreProvider>
		</QueryClientProvider>
	);
};

export const BootstrapClient = () => {
	useLayoutEffect(() => {
		if (!window.bootstrap) {
			require("bootstrap/dist/js/bootstrap.bundle");
			require("bootstrap/dist/js/bootstrap");
		}
	}, []);

	return null;
};

export default AppClientProvider;
