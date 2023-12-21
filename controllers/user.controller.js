import { asyncHandler } from "../middleware/errorHandling.js";
import { login, register } from "../services/user.services.js";
import CreatedResponse from "../utils/api_response/success/CreatedResponse.js";
import RetrivedResponse from "../utils/api_response/success/RetrivedResponse.js";

export const registerController = asyncHandler(
    async (req,res)=>{
        const {username, password} = req.body;
        const result = await register(username, password)
        const response = new CreatedResponse([result],req )
        res.status(response.statusCode).json(response.getResponseJSON());
})

export const loginController = asyncHandler(
    async (req,res)=>{
        const {username, password} = req.body;
        const result = await login(username, password)
        const response = new RetrivedResponse([result],req )
        res.status(response.statusCode).json(response.getResponseJSON());
})
