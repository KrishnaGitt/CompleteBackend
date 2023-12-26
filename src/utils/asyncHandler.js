const asyncHandler=(requestHandler)=>{
    return Promise.resolve(req,res,next).catch((error)=>next(error))
}


export {asyncHandler}



// const asyncHandler=(fun)=>async(req,res,next)=>{
//     try {
//         await fun(req,res,next);
//     } catch (error) {
//         resizeBy.status(error.code||500).json({
//             sucess:false,
//             message:error.message

//         })
        
//     }

// }