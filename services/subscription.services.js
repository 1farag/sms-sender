import SubscriptionRepository from "../repositories/subscription.repository.js";
import { BadRequestError } from "../utils/errors.js";


export const createSubscription = async ({userId, numSMSs, startDate}) => {
    try {
        const subscription = await SubscriptionRepository.createSubscription({
            userId,
            numSMSs,
            startDate,
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });

        return subscription;
    } catch (error) {
        throw new Error(`Error creating subscription: ${error.message}`);
    }
}

export const retrieveSubscriptionsForUser = async (userId, queryData) => {
    try {
        const subscriptions = await SubscriptionRepository.retrieveSubscriptionsForUser(userId, queryData);
        return subscriptions;
    } catch (error) {
        throw new Error(`Error retrieving subscriptions: ${error.message}`);
    }
}

export const retrieveSubscriptionById = async (id,userId) => {
    try {
        const subscription = await SubscriptionRepository.getSubscriptionById(id,userId);
        return subscription;
    } catch (error) {
        throw new Error(`Error retrieving subscription: ${error.message}`);
    }
}

export const updateSubscription = async (id, { numSMSs, startDate }) => {
    try {
        const subscription = await SubscriptionRepository.updateSubscription(id, { numSMSs, startDate });
        if (!subscription) throw BadRequestError("Failed to Update Subscripe")
        return subscription;
    } catch (error) {
        throw new Error(`Error updating subscription: ${error.message}`);
    }
}

