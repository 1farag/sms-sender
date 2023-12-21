import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createSubscriptio_controller, getSubscriptionById_controller, getSubscriptionsForUser_controller, updateSubscription_controller } from "../controllers/subscription.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { getSubscriptionByIdSchema, getSubscriptionsForUserSchema, subscriptionSchema, updateSubscriptionSchema } from "../validations/subsription.validation.js";

const router = Router();


router.route("/")
    .post(auth,validateRequest(subscriptionSchema), createSubscriptio_controller)
    .get(auth,validateRequest(getSubscriptionsForUserSchema), getSubscriptionsForUser_controller)

router.route("/:subscriptionId")
    .get(auth,validateRequest(getSubscriptionByIdSchema) ,getSubscriptionById_controller)
    .patch(auth , validateRequest(updateSubscriptionSchema) , updateSubscription_controller)

export default router