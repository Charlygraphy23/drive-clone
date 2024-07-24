
import { ResourceService } from "./resource.service"
import { SubscriptionService } from "./subscription.service"


export class StorageService {

    private subscriptionService: SubscriptionService;

    constructor() {
        this.subscriptionService = new SubscriptionService()
    }

    async hasUserStorage(userId: string, fileSizeInBytes: number) {
        const hasSubscription = await this.subscriptionService.getUserSubscription(userId);

        if (!hasSubscription?.isActive) return false;

        const resourceService = new ResourceService();
        const consumedSize = await resourceService.getStorageConsumedByUser(userId);
        const totalSizeToBe = consumedSize + fileSizeInBytes;
        const maxFileSizeAllowed = hasSubscription?.planDetails?.benefitDetails?.maxSize

        console.log("hasSubscription " + hasSubscription)

        if (totalSizeToBe < maxFileSizeAllowed) return true;
        return false;
    }

}