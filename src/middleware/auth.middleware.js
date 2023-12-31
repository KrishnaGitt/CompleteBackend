import { ACCESS_TOKEN_SECREAT } from "../constant.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.acessToken || req.header("Authorization")?.replace("Bearer", "")
        if (!token) {
            throw new ApiError(401, "Aunthorized request");
        }
        //  console.log("token------------",token)
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECREAT);
        //  console.log("decodedToken------------",decodedToken)
        //  console.log("decodedToken------------",decodedToken._id)

        const user = await User.findById(decodedToken?.id)
            .select("--password");
        console.log("user------------", user)
        if (!user) {
            throw new ApiError(404, "user does not exits");
        }
        req.user = user;
        console.log(req.user, "rrrrrrrrrrrrrrrrrrrrr");
        next();
    } catch (error) {
        throw new ApiError(400, error.message + "Some thing not notwroking")
    }
})