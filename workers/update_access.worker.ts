import { connectDB } from "@/app/lib/database/db";

process.on('message', async ({ folder, updateAccessList, deletedUserIds, options }) => {
    try {
        await connectDB()
        // // Perform CPU-intensive operations here
        // console.log(`Processing folder ${folder._id}`);
        // // Example: Update or delete access
        // await service.updateAccess(folder._id, updateAccessList, options);
        // await service.deleteAccess(folder._id, deletedUserIds, options);

        // process.send({ status: 'completed' });
    } catch (error) {
        // process.send({ status: 'error', error: error.message });
    }
});