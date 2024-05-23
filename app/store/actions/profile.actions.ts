import { createAction } from "@reduxjs/toolkit";
import { ProfileDataType } from "../reducers/profile.reduce";

type AddProfileData = ProfileDataType;

export const addProfileData = createAction<AddProfileData>("addProfileData");
export const changeProfileData = createAction<Partial<AddProfileData>>("changeProfileData");

