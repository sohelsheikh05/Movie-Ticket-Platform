import crypto from  "crypto"
import sendSMS from "../libs/sendOTP.js";
import redis from "../config/redis.js";
import { AppError } from "../libs/Error.js";
export const otpService={
    generateOtp:async(phone)=>{
            const otp=crypto.randomInt(100000,10000000);
            const key=`OTP:${phone}`
            console.log(otp)
            redis.set(key,otp,"EX",300);
            // console.log(otp);
            // try{
            // // await sendSMS(`Your Otp for SIgnup is : ${otp}`,req.body.phone);
            // }
            // catch(error){
            //     console.log(error)
            //  return res.status(500).json({success:false,message:"something went Wrong"});
            // }
        // return res.status(200).json({success:true,});
        return 
    },
    verifyOtp:async(phone,otp)=>{
            const key=`OTP:${phone}`
           
           
            const exist=await redis.exists(key);
            
            if(exist==0) throw new AppError("Either otp is not generated or is expired",400);
                
            const uotp=await redis.get(key);
           if(uotp!=otp)  throw new AppError("wrong otp",400);
            //console.log(exist==0)
            await redis.del(key);
        
    }
}