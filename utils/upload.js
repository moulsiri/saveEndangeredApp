import cloudinary from 'cloudinary';


export const uploadImg=async(img,res)=>{
    try{
        const response=await cloudinary.v2.uploader.upload(img,{
            folder:"saveEndangered",
        })
        // console.log(response)
        return {
            id:response.public_id,
            url:response.url
        }


    }catch(err){
        return res.status(400).json({
            message:err.message
        })

    }
}