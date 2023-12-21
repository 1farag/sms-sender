export const checkSubscription = async (userId) => {
    try {
        const subscription = await Campaigns.findOne({
            where: { userId },
        });
        return subscription;
    } catch (error) {
        throw new Error(`Error checking subscription: ${error.message}`);
    }
}