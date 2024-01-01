import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriptionShema=new Schema({
    subscription:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"USer"
    }
})

export const Subscription=mongoose.model("Subscription",subscriptionShema)