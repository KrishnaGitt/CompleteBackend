import mongoose ,{Schema} from "mongoose";

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

export const User=mongoose.model("User",userSchema);