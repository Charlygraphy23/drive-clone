import { SetStateAction, createContext, Dispatch } from "react";
import { ProfileContextStateType } from "./provider";

type ContextStateType = {
	state: ProfileContextStateType;
	dispatch: Dispatch<SetStateAction<ProfileContextStateType>>;
};

const initialState = {} as ContextStateType;
export const ProfileStateContext = createContext(initialState);
