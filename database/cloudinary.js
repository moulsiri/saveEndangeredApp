import cloudinary from 'cloudinary';

const connectCloud=()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUDINARY_KEY,
        api_secret:process.env.CLOUDINARY_SECRET
    })
}

export default connectCloud;