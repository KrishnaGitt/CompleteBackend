import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"


const registorUser=asyncHandler((req, res) => {
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
console.log(email,fullname)
if(
    [fullname,email,username,password].some((field)=>
    field?.trim()==="")
){
    throw new ApiError(400,"please enter required feilds");
}
const exitedUser=User.findOne({
    $or:[{email},{username}]
})
if(exitedUser){
    throw new ApiError(409,"User existed ")
}

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required");
}
// add await and async
const avatar=uploadCloudinary(avatarLocalPath)
const coverImage=uploadCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"avatar is not added sucessfully")
}
User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url,
    username,
    email,
    password,
    
})

})



















 
export {registorUser}