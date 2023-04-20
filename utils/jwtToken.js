
export const sendToken=(org,statusCode,res,req)=>{
    const token=org.getJWTToken();
    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        data:org
    })
}