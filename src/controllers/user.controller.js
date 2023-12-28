import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"


const registorUser=asyncHandler(async(req, res) => {
//get user details
//validation not empty
//if user exits  email||username
//check for images \\check for avtar
//upload them to cludinary
//create user obj-create entry in db
//remove password and refrsh token
//check for user creation
//return res
const{fullname,email,username,password}=req.body
if(
    [fullname,email,username,password].some((field)=>
    field?.trim()==="")
){
    throw new ApiError(400,"please enter required feilds");
}
const exitedUser=await User.findOne({
    $or:[{email},{username}]
})
if(exitedUser){
    throw new ApiError(409,"User existeddddd ")
}

const avatarLocalPath=req.files?.avatar[0]?.path;
console.log(avatarLocalPath)
// const coverImageLocalPath=req.files?.coverImage[0]?.path;
console.log(req.files);
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required");
}
// add await and async
const avatar=await uploadCloudinary(avatarLocalPath)
//console.log(avatar)
// const coverImage=await uploadCloudinary(coverImageLocalPath)

// if(!avatar){
//     throw new ApiError(400,"avatar is not added sucessfully")
// }
const user=await User.create({
    fullname,
    avatar:avatar?.url,
    coverImage:"coverImage?.url",
    username,
    email,
    password,
})
const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
);
if(!createdUser){
    throw new ApiError(400,"Could created the user please your code")
}

 res.status(201).json(
    new ApiResponse(200,createdUser,"Data inserted sycessfully in data base")

)
})



















 
export {registorUser}