import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
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

})



















 
export {registorUser}