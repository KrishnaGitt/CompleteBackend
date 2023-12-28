// exports.create=async(req,res)=>{

// try {
//     res.json({
//         message:"USer created sucessfully"
//     })
// } catch (error) {
    
//     console.log("========================",err)
// }
// }
import multer, { diskStorage } from "multer"

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)

    }
}) 
export const upload=multer({
    storage:storage
})