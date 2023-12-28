import mongoose from "mongoose";
import {DB_NAME,DB_NAMES,PORT,MONGODB_URI,MONGODB_URL} from "../constant.js"

let connectDB=async()=>{
    try{
        // const dataInstance=await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce") 
        const dataInstance=await mongoose.connect(`mongodb://127.0.0.1:27017/Ecommerce`) 
        console.log("Data base is connected on",dataInstance.connection.host)
        // console.log("data",dataInstance.product)
    }catch(error){
        console.log("ERROR OCCURED==========================",process.env.MONGODB_URL,error)
        // process.exit(1)
    }
}

export default connectDB