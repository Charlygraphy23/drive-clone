import { createAction } from "@reduxjs/toolkit";
import { FileDataType } from "../reducers/files.reducers";
import { ProfileDataType } from "../reducers/profile.reduce";

type AddProfileData = {} & ProfileDataType;

export const addProfileData = createAction<AddProfileData>("addProfileData");
