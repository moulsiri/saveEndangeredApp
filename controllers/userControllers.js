import Users from "../models/Users.js";

import { sendToken } from "../utils/jwtToken.js";


export const registerUser=async(req,res)=>{
    try{
        const userData=await Users.create({
            ...req.body
        })
        sendToken(userData,201,res,req)

    }catch(err){
        res.status(409).json({message:err.message})

    }
}

export const logOut=async (req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({success:true,message:"log-out"});

    }catch(err){
        res.status(400).json({
            message:err.message
        })

    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"please Enter email or password"
            })
        }
        const userData=await Users.findOne({email}).select("+password");
        if(!userData){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const isPasswordMatched=await userData.comparePasswords(password);
        if(!isPasswordMatched){
            return res.status(401).json({
                message:"Invalid password"
            })
        }
        sendToken(userData,200,res);

    }catch(err){
        res.status(400).json({
            message:err.message
        })

    }
}

export const loadUser=async(req,res)=>{
    try{
        return res.status(200).json({success:true,
        data:req.user});

    }catch(err){
        return res.status(400).json({
            status:'fail',
            message:"please login to get details"
        })

    }
}