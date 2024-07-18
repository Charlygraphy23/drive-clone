
import { TOTAL_FREE_SPACE } from "@/app/_config/const"
import mongoose from "mongoose"
import { StorageModal } from "../models/storage"
import { ResourceService } from "./resource.service"

const Model = StorageModal

export class StorageService {

    private async createStorageOfAUser(userId: string) {
        return await Model.create({
            userId: userId,
            totalStorageInBytes: TOTAL_FREE_SPACE,
        })
    }

    async hasUserStorage(userId: string, fileSizeInBytes: number) {
        const hasStorage = await Model.findOne({ userId: new mongoose.Types.ObjectId(userId) });
        const resourceService = new ResourceService();
        const consumedSize = await resourceService.getTotalStorageConsumed(userId);
        const totalSizeToBe = consumedSize + fileSizeInBytes;

        console.log("Consumed size: " + consumedSize)
        console.log("totalSizeToBe size: " + totalSizeToBe)
        console.log("fileSizeInBytes size: " + fileSizeInBytes)


        if (!hasStorage) {
            console.log("User doesn't created storage before")
            // create free storage
            await this.createStorageOfAUser(userId);

            if (totalSizeToBe <= TOTAL_FREE_SPACE) return true;
            return false
        }


        // TODO: this comparison need to be fetched from user enrolled subscription pack
        if (totalSizeToBe > TOTAL_FREE_SPACE) return false;
        return true;
    }

}