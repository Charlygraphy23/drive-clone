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

