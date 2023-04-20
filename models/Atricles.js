import mongoose from "mongoose";

const articleSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:[true,"Please provide a good heading to your article"]
    },
    intro:{
        type:String,
        required:[true,"Pease provide some brief intro to your article"]
    },
    content:[],
    varifiedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organisations',
        required:[true,"please specify an organisation to verify your article"],
    },
    writtenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:[true,"Please provide this writers name"]
    },
    previewImg:{
        id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Articles=mongoose.model('articles',articleSchema);
export default Articles;