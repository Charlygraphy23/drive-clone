import { passwordYupValidation } from "@/app/components/loginFlow/interfaces/index.interface";
import { File } from "buffer";
import { object, ref, string } from "yup";
import { AccessList } from "../store/actions/info.actions";

/* eslint-disable no-unused-vars */
export type ActionType = {
	type: string;
	payload:
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
}