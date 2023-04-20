import nodemailer from 'nodemailer'

export const sendEmail=async (res,config)=>{
    try{

        let testAccount = await nodemailer.createTestAccount();

        //connect with the smtp 
        let transport=await nodemailer.createTransport(config)

        let info=await transport.sendMail({
            from:process.env.GMAIL_MAIL,//senders address
            to:"moulsiri2301@gmail.com", //list of receivers
            subject:"Hello ", //subject line
            text:"hello world",//plain text body
            html:"<b>Hello world!</b>",//html body
        })
        // console.log("Message sent: %s",info.messageId);
        res.status(200).json(info)
        

    }catch(err){
        res.status(400).json({message:err.message})
    }

}