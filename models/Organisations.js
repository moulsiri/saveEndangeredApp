import mongoose from 'mongoose';

import validator from 'validator';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';



const organisationSchema=new mongoose.Schema({
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        select:false,

    },
    saveUserName:{
        type:String,
        required:[true,"please provide a username for your organisation of save endangered application"],
        unique:true

    },
    email:{
        type:String,
        required:[true,"please Enter your organisations email address"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email address"]

    },
    name:{
        type:String,
        required:[true,"Please provide the complete name of the organisation"]
    },
    about:{
        type:String,
        required:[true,"Please provide some information about your organisation"],
        min:[20,'organisation about info should be at least 20 character length']
    },
    location:{
        address:{
            streetAddress:{
                type:String,
                // required:[true,"Please provide the street address"],
            },
            city:{
                type:String,
                // required:[true,"Please Specify the city"]
            },
            state:{
                type:String,
                // required:[true,"Please enter state or province"]
            },
            pincode:{
                type:String,
                // required:[true,"Please enter pincode"]
            },
            country:{
                type:String,
                // required:[true,"Please Enter the country name"]
            }
        },
    },
    phoneNo:{
        type:Number,
        required:[true,"please provide your phone no."],
    },
    displayImg:{
        id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    articlesToVerify:[
        {
            articleId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'articles'
            },
            isVerified:{
                type:Boolean,
                default:false
            }
        }
    ],
    websiteURL:{
        type:String
    },
    isVerified:{
        type:Boolean
    },
    gallery:[],
    articlesVerifiedBy:[],
    joinedAt:{
        type:Date,
        default:Date.now
    }
})
//password encryption
organisationSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

/**
 * organisation methods
 */

//JWT TOKEN
organisationSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE,})
}

//compare password
organisationSchema.methods.comparePasswords=async function(enteredPass){
    return await bcrypt.compare(enteredPass,this.password);
}



const Organisation=mongoose.model('organisations',organisationSchema);
export default Organisation;