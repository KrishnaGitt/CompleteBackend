import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import { REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECREAT, ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECREAT } from "../constant.js";


const registorUser = asyncHandler(async (req, res) => {
    //get user details
    //validation not empty
    //if user exits  email||username
    //check for images \\check for avtar
    //upload them to cludinary
    //create user obj-create entry in db
    //remove password and refrsh token
    //check for user creation
    //return res
    const { fullname, email, username, password } = req.body
    if (
        [fullname, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "please enter required feilds");
    }
    const exitedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    console.log("------------user from database", exitedUser);
    if (exitedUser) {
        throw new ApiError(409, "User existeddddd ")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath)

    // const coverImageLocalPath=req.files?.coverImage[0]?.path;
    console.log(req.files);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    // if(req.files&&Array.isArray(req.files.coverImage)&&req.file.coverImag.length>0){

    // }else{
    //     throw new ApiError(404,"file not able to upload");
    // }

    // add await and async
    const avatar = await uploadCloudinary(avatarLocalPath)
    console.log(avatar)

    // const coverImage=await uploadCloudinary(coverImageLocalPath)
    // 
    if (!avatar) {
        throw new ApiError(400, "avatar is not added sucessfully")
    }
    const user = await User.create({
        fullname,
        avatar: avatar?.url,
        coverImage: "coverImage?.url",
        username,
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(400, "Could created the user please your code")
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "Data inserted sycessfully in data base")

    )
})

const loginUser = asyncHandler(async (req, res) => {
    //req.body
    //verify-username/email
    //find the user
    //password check
    //refresh and acees token
    //send cokkies

    const { username, email, password } = req.body
    if (!(username || email)) {
        throw new ApiError(400, "User name or email is required")
    }
    const userDataBase = await User.findOne({
        $or: [{ email }, { username }]
    })
    console.log("------------user from database------------->", userDataBase);
    if (!userDataBase) {
        throw new ApiError(400, "User does not exits")
    }
    const isPasswordValid = await userDataBase.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Password is  not valid")
    }
    const { acessToken, refreshToken } = await generateAcessAndRefreshToken(userDataBase._id)
    const loggedInUser = await User.findById(userDataBase._id);
    const option = {
        httpOnly: true,
        secure: true
    }

    res.cookie("acessToken", acessToken).
        cookie("refreshToken", refreshToken).
        json(
            new ApiResponse(200, {
                user: loggedInUser

            },
                "logged in sucessfully"
            )
        )
})


const generateAcessAndRefreshToken = async (userId) => {
    try {
        const userDataBase = await User.findById(userId)
      
        const acessToken = userDataBase.generateAcessToken();
        
        const refreshToken = userDataBase.generateRefreshToken();
       
        userDataBase.refreshToken = refreshToken;
      
        await userDataBase.save({ validateBeforeSave: false })
        return { acessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Error Whiler genrating access token")
    }
};


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                coverImage: undefined
            }
        }
    )
    const option = {
        httpOnly: true,
        secure: true
    }
    return res.
        status(200).
        clearCookie("acessToken").
        clearCookie("refreshToken").
        json(
            new ApiResponse(200, {}, "userLOgged out")
        )
})

const reshAccessToken = asyncHandler(async (req, res) => {

    const incomingToken = req.cookies.refreshToken || req.body.refreshToken
    
    
   
    if (!incomingToken) {
        throw new ApiError(404, "Refresh Token is not receiving from client")
    }
    const refreshTokenUSer = jwt.verify(incomingToken, REFRESH_TOKEN_SECREAT)
   

    const user = await User.findById(refreshTokenUSer.id);
    if (!user) {
        throw new ApiError(403, "USer is not not there")

    }
    
    const { acessToken, refreshToken } = await generateAcessAndRefreshToken(user._id);
    console.log("----acessToken------->",acessToken)
    console.log("-----refreshToken------>",refreshToken)
    res.status(200).cookie("acessToken", acessToken).
        cookie("refreshToken", refreshToken).
        json(
            new ApiResponse(200, {
                acessToken,
                refreshToken
            },
                "Refresh token generated")
        )
})

const changePassword=asyncHandler(async(req,res)=>{
    const{oldpassword,newpassword}=req.body
    console.log("--oldpassword----",oldpassword)
    console.log("---newpassword---",newpassword)

    const user=await User.findById(req.user._id);
    const passwordflag= await user.isPasswordCorrect(oldpassword)
    console.log("--passwordflag----",passwordflag)
    if(!passwordflag){
        throw new ApiError(200,"Please enter correct old password")
    }
    
    user.password=newpassword;
    await user.save({validateBeforeSave: false})
    console.log(" user.password--", user.password)
    res.status(200).json(
         new ApiResponse(200,{
            user
        },
        "password changed suceesfully")
    )
})












export { registorUser, loginUser, logoutUser,reshAccessToken,changePassword }