import Organisation from "../models/Organisations.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";


export const registerOrg=async(req,res,next)=>{
    try{
        const orgData=await Organisation.create({
            ...req.body
        })
        sendToken(orgData,201,res,req)

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
        res.status(200).json({success:true,message:"log-out"})

    }catch(err){
        res.status(400).json({
            message:err.message
        })

    }
}

export const login=async(req,res)=>{
    try{
        // console.log(req.body)
        const {saveUserName,password}=req.body;
        // console.log(saveUserName,password)
        if(!saveUserName || !password){
            return res.status(400).json({
                message:"please Enter username or password"
            });
        }
            const orgData=await Organisation.findOne({saveUserName}).select("+password");
            if(!orgData){
                return res.status(401).json({
                    message:"Invalid username or password"
                })
            }
            const isPasswrodMatched=await orgData.comparePasswords(password);
            if(!isPasswrodMatched){
                return res.status(401).json({
                    message:"Invalid password"
                })
            }
            sendToken(orgData,200,res);

    }catch(err){
        res.status(400).json({
            message:err.message
        });

    }
}
export const loadOrg=async(req,res)=>{
    try{
        // console.log(req.org)
        return res.status(200).json({success:true,data:req.org});

    }catch(err){
        return res.status(400).json({
            status:'fail',
            message:"please login to get details"
        })
        
    }
}
export const OrgList=async(req,res)=>{
    try{
        let orgList=await Organisation.find();
        res.status(200).json({status:'success',orgList})

    }catch(err){
        res.status(400).json({status:'fail',message:err.message})

    }
}

export const sendOrgmail=async(req,res)=>{
    let ethereal={
        host:"smtp.ethereal.email",
        port:587,
        auth:{
            user: 'berneice.glover@ethereal.email',
            pass: 'MKH18aweVpxZvSchnA'
        }
    }
    let gmail={
        service:'gmail',
        auth:{
            user:process.env.GMAIL_MAIL,
            pass:process.env.GMAIL_APP_PASS
        }
    }
    sendEmail(res,gmail);
}