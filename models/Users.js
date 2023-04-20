import mongoose from 'mongoose';

import validator from 'validator';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({
    name:{
    type:String,
    required:[true,"Please Enter your name"]
    },
    email:{
        type:String,
        required:[true,"please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email"],
    },
    articles:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'articles'
        }
    ],
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        select:false,
    },
    joinedAt:{
        type:Date,
        default:Date.now
    },
    displayImg:{
        id:{
            type:String
        },
        url:{
            type:String
        }
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePasswords=async function(enteredPass){
    return await bcrypt.compare(enteredPass,this.password);
}

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE,})
}

const Users=mongoose.model('users',userSchema);
export default Users;