import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";
import {REFRESH_TOKEN_EXPIRY,REFRESH_TOKEN_SECREAT,ACCESS_TOKEN_EXPIRY,ACCESS_TOKEN_SECREAT} from "../constant";

const userSchema=new Schema({
username:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true,
    index:true
},
username:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true
},
fullname:{
    type:String,
    required:true,
    lowercase:true,
    trim:true
},
avatar:{
    type:String,
    required:true,

},
coverImage:{
    type:String,
    required:true
},
watchHistory:{
    type:Schema.Types.ObjectId,
    ref:"Vedio"
},
password:{
    type:String,
    required:[true,"passsword is required"]
},
refreshToken:{
    type:string
}
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect=async function(passsword){
    return await bcrypt.compare(passsword,this.passsword);
}

userSchema.methods.generateAcessToken=function(){
    return jwt.sign({
        id:this._id,
        email:this.email,
        fullname:this.fullname,
        username:this.username
    },
    ACCESS_TOKEN_SECREAT,
    {
        expiresIn:ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        id:this._id
    },
    REFRESH_TOKEN_SECREAT,
    {
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
    )
    
}

export const User=mongoose.model("User",userSchema);