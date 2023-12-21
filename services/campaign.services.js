import Campaigns from "../models/campaigns.model.js";
import Subscriptions from "../models/subscription.model.js";
import CampaignRepository from "../repositories/campaign.repository.js"
import SubscriptionRepository from "../repositories/subscription.repository.js";
import { paginate } from "../utils/helpers/pagination.js";
import { validateMessage } from "../utils/helpers/validatMessage.js";
import { campaignFilter } from "../utils/helpers/campaignFilter.js";
import { BadRequestError } from "../utils/errors.js";

export const createCampaign = async ({
    senderName,
    campaignName,
    message,
    phoneNumbers,
    userId    
})=>{
    

    try {
        let sum = 0;
         let campaign;

        const subscriptions = await SubscriptionRepository.checkSubscription(userId);
        if (subscriptions.length == 0) throw new Error("No subscription valid found for this user");
         

        const messages = validateMessage(message);
        // sum sms count from all subscriptions
        subscriptions.forEach(subscription => {
                sum += subscription.numSMSs;   
        });

        if (messages.length * phoneNumbers.length > sum ) throw new Error("Not enough SMSs");

         campaign = await CampaignRepository.createCampaign({
                senderName,
                campaignName,
                message: messages[0],
                phoneNumbers,
                userId,
                subscriptionId: subscriptions[0].id
            })

            let deductedCount = messages.length * phoneNumbers.length;

        for (let i = 0; i < subscriptions.length; i++) {
            if (deductedCount > subscriptions[i].numSMSs) {
                await SubscriptionRepository.deductQuotas(subscriptions[i].id, subscriptions[i].numSMSs);
                deductedCount -= subscriptions[i].numSMSs;
            } else {
                await SubscriptionRepository.deductQuotas(subscriptions[i].id, deductedCount);
                break;
            }
        }
        return campaign
    
        } catch (error) {
            console.log(error);
            throw new Error(`Error creating campaign: ${error.message}`);            
        }
}

export const retrievCampaignsForUser = async (userId, queryData )=>{
    const { page , size } = queryData;
    const {limit, offset} = paginate(page, size)
    const filter = campaignFilter(queryData)

    const campaigns = await Campaigns.findAndCountAll({
        where: { 
            userId,
            ...filter
         },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
    })
    return campaigns;

}

export const retrieveCampaignById = async (campaignId,userId)=>{
    try {
        const campaign = await CampaignRepository.getCampaignById(campaignId,userId);
        return campaign;
    } catch (error) {
        throw new Error(`Error retrieving campaign: ${error.message}`);
    }
}

export const updateCampaignStatus = async (campaignId ,status)=>{
    try {
        const updateCampaign = await CampaignRepository.updateCampaignStatus(campaignId,status)
        if (!updateCampaign) throw new BadRequestError("Failed to update")
    } catch (error) {
        throw new Error(`Error Failed to update : ${error.message}`)
    }
    
    
}


async function deductFromQuotas(subscriptionId, deductedCount) {
        try {
    
        
            const subscription = await Subscriptions.findByPk(subscriptionId);
            let numSMSs = subscription.numSMSs - deductedCount; 
            let sentSMSsNum = subscription.sentSMSsNum + deductedCount; 
            
              await subscription.update({numSMSs, sentSMSsNum}, {    
                where: { id: subscriptionId }
            });


        } catch (error) {
            console.log(error);
        }
    }
