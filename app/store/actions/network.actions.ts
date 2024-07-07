import { EffectiveConnectionType } from "@/app/interfaces/index.interface";
import { createAction } from "@reduxjs/toolkit";


export const addNetworkQuality = createAction<EffectiveConnectionType>("addNetworkQuality");