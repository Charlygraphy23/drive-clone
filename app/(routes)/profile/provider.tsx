"use client";

import { RootState, useAppDispatch } from "@/app/store";
import { addProfileData } from "@/app/store/actions";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { User } from "next-auth";
import { PropsWithChildren, useRef } from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "./components/modal/changePasswordModal";

type Props = { userInfo: User | null } & PropsWithChildren

export const ProfileProvider = ({ children, userInfo }: Props) => {
	const initialRef = useRef<boolean>(false)
	const { changePasswordModal } = useSelector<RootState, ModalStateType>(
		(state) => state.modals
	);
	const dispatch = useAppDispatch()


	if (!initialRef?.current) {
		dispatch(addProfileData({
			_id: String(userInfo?._id) ?? "",
			firstName: userInfo?.firstName ?? "",
			lastName: userInfo?.lastName ?? "",
			email: userInfo?.email ?? "",
			imageUrl: userInfo?.imageUrl ?? "",
		}))
		initialRef.current = true
	}

	return (
		<>
			{children}
			<ChangePasswordModal isOpen={changePasswordModal} />
		</>
	);
};
