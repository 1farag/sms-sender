import { Router } from "express";
import { loginController, registerController } from "../controllers/user.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { userSchema } from "../validations/user.validation.js";

const router = Router();


router.post("/signup", validateRequest(userSchema),registerController)

router.post("/login", validateRequest(userSchema) ,loginController)


export default router
