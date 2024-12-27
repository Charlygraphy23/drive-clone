"use client";

import { RootState, useAppDispatch } from "@/app/store";
import { addProfileData } from "@/app/store/actions";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { User } from "next-auth";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "./(routes)/profile/components/modal/changePasswordModal";

type Props = { userInfo: User | null } & PropsWithChildren

export const ProfileProvider = ({ children, userInfo }: Props) => {
	const { changePasswordModal } = useSelector<RootState, ModalStateType>(
		(state) => state.modals
	);
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(addProfileData({
			_id: String(userInfo?._id) ?? "",
			firstName: userInfo?.firstName ?? "",
			lastName: userInfo?.lastName ?? "",
			email: userInfo?.email ?? "",
			imageUrl: userInfo?.imageUrl ?? "",
		}))
	}, [dispatch, userInfo?._id, userInfo?.email, userInfo?.firstName, userInfo?.imageUrl, userInfo?.lastName])

	return (
		<>
			{children}
			<ChangePasswordModal isOpen={changePasswordModal} />
		</>
	);
};
