const express=require("express");
const {create} =require('../middleware/multer.midleware');
const router=express.Router();
const multer=require('multer');
const fs=require("fs");
const app=express()

// const path=require('fs');
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         console.log("----------------",file)
//         if(!fs.existsSync('public')){
//             fs.mkdirSync('public')
//         }
//         if(!fs.existsSync('public/files')){
//             fs.mkdirSync('public/files')
//         }
//         cb(null,'public/files');
//     },
//     filename:function(req,file,cb){
//         console.log("----------------",file)
//         cb(null,Date.now()+file.originalname);
//     }
// })

// const upload=multer({
//     storage
// })




// router.get("/c",(req,res)=>{
// res.send("hello");
// });

module.exports=router