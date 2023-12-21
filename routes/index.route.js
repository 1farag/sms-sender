import { Router } from "express";
import campaignRouter from "./campaign.router.js"
import subscriptionRouter from "./subscription.router.js";
import userRouter from "./user.router.js"

const router = Router();

router.use("/campaigns",campaignRouter)
router.use("/subscriptions",subscriptionRouter)
router.use("/users",userRouter)

export default router