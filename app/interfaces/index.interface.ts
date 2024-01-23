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
