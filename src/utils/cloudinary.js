import {v2 as cloudinary} from 'cloudinary';
const fs=          
cloudinary.config({ 
  cloud_name: 'dpsfciilv', 
  api_key: '951225447178365', 
  api_secret: '5RFjTWdJ5jdXgTKBodlQmO5l5lw' 
});

const uploadCloudinary=async(localPath)=>{
    try {
        if(!localPath) return null
        const resp=await cloudinary.uploader.upload(localPath,{
            resource_type:"auto"
        })
        console.log("file uploaded sucessfully",resp.url);
        return resp;
    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
};
export {cloudinary}