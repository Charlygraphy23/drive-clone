"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { ProfileStateContext } from "./context";
import {
	ProfileDataType,
	ProfileStateType,
} from "@/app/store/reducers/profile.reduce";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const initialState = {
	isEditProfile: false,
	data: {} as ProfileDataType,
};

export type ProfileContextStateType = typeof initialState;

export const ProfileProvider = ({ children }: PropsWithChildren) => {
	const { data } = useSelector<RootState, ProfileStateType>(
		(state) => state.profile
	);
	const [state, setState] = useState({
		...initialState,
		data,
	});

	useEffect(() => {
		setState((prev) => ({
			...prev,
			data,
		}));
	}, [data]);

	return (
		<ProfileStateContext.Provider value={{ state, dispatch: setState }}>
			{children}
		</ProfileStateContext.Provider>
	);
};
