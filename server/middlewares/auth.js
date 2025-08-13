// Middleware to check if user has premium plan
import {clerkClient} from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const {userId, has} = await req.auth();
        const hasPremium = await has({plan: 'premium'});

        // User data to update metadata if he doesn't have a premium plan
        const userData = await clerkClient.users.getUser(userId);
        if (!hasPremium && userData.privateMetadata.free_usage) {
            req.free_usage = userData.privateMetadata.free_usage;
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            })
            // If a user doesn't have a premium plan, set free_usage to 0 in the request object
            req.free_usage = 0;
        }
        req.plan = hasPremium ? 'premium' : 'free';
        next();
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};