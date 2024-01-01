import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {REFRESH_TOKEN_EXPIRY,REFRESH_TOKEN_SECREAT,ACCESS_TOKEN_EXPIRY,ACCESS_TOKEN_SECREAT} from "../constant.js";

const userSchema=new Schema({
username:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true,
    index:true
},
email:{
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
    type:String
}
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    // console.log(await bcrypt.compare("password","password"))
    if(password===this.password) return true;
    else{
        return false;
    }
    // return await bcrypt.compare(password,this.password);
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

userSchema.methods.generateRefreshToken= function(){
  const a=jwt.sign({
        id:this._id
    },
    REFRESH_TOKEN_SECREAT,
    {
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
    )
    return a;
    
}

export const User=mongoose.model("User",userSchema);