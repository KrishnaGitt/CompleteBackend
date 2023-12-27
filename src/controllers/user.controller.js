import {asyncHandler} from "../utils/asyncHandler.js"
console.log("userControllr-----------------------");
const registorUser=asyncHandler((req, res) => {
    console.log("userControllr-----------------------");
    res.status(200).json({
        message:"hello"
    })
})

 
export {registorUser}