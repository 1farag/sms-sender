import { Op } from "sequelize";
import Subscriptions from "../models/subscription.model.js";
import { subscriptionFilter } from "../utils/helpers/subscriptionFilter.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";
import { paginate } from "../utils/helpers/pagination.js";

class SubscriptionRepository {
    // Create a new subscription
    static async createSubscription(subscriptionData) {
      try {
        const createdSubscription = await Subscriptions.create(subscriptionData);
        return createdSubscription;
      } catch (error) {
        throw new BadRequestError(`Error creating subscription: ${error.message}`);
      }
    }
  
    // Get subscription by ID
    static async getSubscriptionById(subscriptionId, userId) {
      try {
        const subscription = await Subscriptions.findOne({
          where: { id: subscriptionId, userId:  userId },
        });
        if(!subscription) throw new NotFoundError("subscription not found")
        return subscription;
      } catch (error) {
        throw new Error(`Error retrieving subscription: ${error.message}`);
      }
    }
  
    // Update subscription data
    static async updateSubscription(subscriptionId, updatedData) {
      try {
        const [updatedRows] = await Subscriptions.update(updatedData, {
          where: { id: subscriptionId },
        });
        return updatedRows > 0;
      } catch (error) {
        throw new Error(`Error updating subscription: ${error.message}`);
      }
    }

    // Deduct from quotas
    static async deductQuotas(subscriptionId, deductedCount) {
      try {
        
        // update numsSmss & sentSmss
        const subscription = await Subscriptions.findByPk(subscriptionId);
            let numSMSs = subscription.numSMSs - deductedCount; 
            let sentSMSsNum = subscription.sentSMSsNum + deductedCount; 
            
              await subscription.update({numSMSs, sentSMSsNum});

        
      } catch (error) {
        throw new Error(`Error deducting from quotas: ${error.message}`);
      }
   
    }


    static async checkSubscription(userId) {
        try {
          const subscription = await Subscriptions.findAll({
            where: {
              userId, 
              numSMSs: {
                [Op.gt]: 0
              },
              endDate: {
                [Op.gt]: new Date()
              }
          },
          order:[ ['numSMSs', 'DESC']]
        });
          return subscription;
        } catch (error) {
          throw new Error(`Error checking subscription: ${error.message}`);
        }
      }

      // sum sms count for user

      static async sumSMSCount(userId) {
        try {
          const sum = await Subscriptions.sum('NumSMSs', {
            where: { userId, 
              NumSMSs: {
                [Op.gt]: 0
              },
              endDate: {
                [Op.gt]: new Date()
              }
          }
        });
          return sum;
        } catch (error) {
          throw new Error(`Error checking subscription: ${error.message}`);
        }
      }
      
    // Get all subscriptions

    static async retrieveSubscriptionsForUser(userId, queryData) {
      try {
        const { page, size } = queryData;
        const { limit, offset } = paginate(page, size);
        const filter = subscriptionFilter(queryData);
        const subscriptions = await Subscriptions.findAndCountAll({
          where: { userId, ...filter },
          order: [["createdAt", "DESC"]],
          limit,
          offset,
        });
        return subscriptions
      } catch (error) {
        throw new Error(`Error retrieving subscriptions: ${error.message}`);
      }
    }


  }
  
    export default SubscriptionRepository;