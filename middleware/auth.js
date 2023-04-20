import jwt from 'jsonwebtoken';
import Orgnisation from '../models/Organisations.js';
import Users from '../models/Users.js';
/**
 * check for organisation login or not
 */

export const isOrgAuthenticated=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({
                message:"Please login to access these resources"
            })
        }else{
            const decodedData=jwt.verify(token,process.env.JWT_SECRET);
            let org=await Orgnisation.findById(decodedData.id);
            if(!org){
                return res.status(400).json({
                    message:"User not found"
                })
            }
            req.org=org;
            next();
        }

    }catch(err){
        return res.status(400).json({
            message:err.message
        });

    }
}

export const isUserAuthenticated=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({
                message:"Please login to access these resources"
            })
        }else{
            const decodedData=jwt.verify(token,process.env.JWT_SECRET);
            let user=await Users.findById(decodedData.id);
            if(!user){
                return res.status(400).json({
                    message:"user not found"
                })
            }
            req.user=user
            next();
        }

    }catch(err){
        return res.status(400).json({
            message:err.message
        })

    }
}