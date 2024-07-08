import { passwordYupValidation } from "@/app/components/loginFlow/interfaces/index.interface";
import { object, ref, string } from "yup";
import { DATA_TYPE } from "../lib/database/interfaces/files.interfaces";
import { AccessList } from "../store/actions/info.actions";

/* eslint-disable no-unused-vars */
export type ActionType = {
	type: string;
	payload?:
	| Record<string, any>
	| string
	| boolean
	| number
	| undefined
	| null
	| unknown
	| any;
};



export type SelectedAccessType = { _id?: string, } & Pick<AccessList, "accessType" | "userInfo" | "resourceId">

export type PasswordChangeFormStateType = {
	newPassword: string;
	confirmPassword: string;
}

export type PasswordChangeFormErrorStatType = Record<keyof PasswordChangeFormStateType, string>

export const PasswordChangeFormSchema = object().shape({
	newPassword: passwordYupValidation,
	confirmPassword: string().oneOf([ref("newPassword")], 'Passwords must match')
})

export type FileUploadType = {
	file: File,
	progress: number,
	hasFinished: boolean,
	isUploading: boolean,
	isFailed: boolean
	uploadId: string
	updatedFileName: string
}


export type ResourcePayloadType = {
	folderId?: string;
	resourceType?: DATA_TYPE | null;
	showDeleted?: boolean;
	shared: "only" | "show" | "off";
	page?: number;
	limit?: number
	userId?: string
	search?: string
	fileId?: string;
	filters?: {
		createdAt?: Array<string>,
		type?: string[]
	}
}


export enum EffectiveConnectionType {
	SLOW_2G = "slow-2g",
	SPEED_2G = "2g",
	SPEED_3G = "3g",
	SPEED_4G = "4g",
	SPEED_5G = "5g",
	UNKNOWN = "",


}