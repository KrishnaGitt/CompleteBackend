import { ACCESS_TOKEN_SECREAT } from "../constant.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
     const token = req.cookies?.acessToken || req.header("Authorization")?.replace("Bearer", "")
     if (!token) {
         throw new ApiError(401, "Aunthorized request");
     }
     const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECREAT);
     const user = await User.findById(decodedToken?._id)
         .select("--password -refreshToken");
     if(!user){
         throw new ApiError(404,"user does not exits");
     }   
     req.user=user; 
     next();
   } catch (error) {
        throw new ApiError(400,error.message+"Some thing not notwroking")
   }
})