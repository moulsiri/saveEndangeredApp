import Articles from "../models/Atricles.js";
import Users from '../models/Users.js';
import Organisation from "../models/Organisations.js";
import { uploadImg } from "../utils/upload.js";

export const createArticle=async(req,res,next)=>{
    try{
        req.body.writtenBy=req.user._id;
        let varifiedTo=req.body.varifiedTo;

        req.body.previewImg=await uploadImg(req.body.previewImg,res);

        var article=await Articles.create({
            ...req.body
        })

        const org=await Organisation.findById(varifiedTo);
        if(!org){
            return res.status(400).json({message:"please enter valid organisation id to verify"})
        }
        org.articlesToVerify.push({
            articleId:article._id,
            isVerified:false
        })
        await org.save({validateBeforeSave:false})


        const user=await Users.findById( req.user._id);
        if(!user){
            return res.status(400).json({message:"please enter valid writer of the article"})
        }
        user.articles.push(article._id);
        await user.save({validateBeforeSave:false});
        return res.status(200).json({
            status:'success',
            article,
        })
        
    }catch(err){
        if(article){
           let d=Articles.findByIdAndDelete(article._id)
        }
        return res.status(400).json({
            status:'fail',
            message:err.message
        })

    }
}

export const articleList=async(req,res,next)=>{
    try{
        const articles=await Articles.find()
        .populate("writtenBy")
        .populate("varifiedTo")
        return res.status(200).json({
            status:'success',
            articleList:articles
        })

    }catch(err){
        return res.status(400).json({
            status:'fail',
            message:err.message
        })

    }
}