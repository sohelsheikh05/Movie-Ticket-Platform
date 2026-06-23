import redis from "../config/redis.js";
import { otpService } from "./otp.service.js";
import prisma from "../config/prisma.js"
import { jwtService } from "../libs/jwtService.js";
import { AppError } from "../libs/Error.js";
import {catchAsync} from "../middlewares/errorHandler.middleware.js"
export const signup=catchAsync(async(req,res)=>{
    
    if(!req.body) throw new AppError("Data not Provided",400);

    const {name,gender,age,phone}=req.body;
    if(!phone)  throw new AppError("phone number is required",400);

    const user =await prisma.user.findUnique({where:{phone:phone}})

    if(user)  throw new AppError("User Already exists Plz Login",409);
    await redis.set(`user:${phone}`,JSON.stringify({name,gender,age,phone}),"EX",300);
    await otpService.generateOtp(phone)
    return res.status(200).json({success:true,message:"Otp sent Successfully"})

})

export const verifySignup=catchAsync(async(req,res)=>{
        if(!req.body) throw new AppError("Data not Provided",400);
        
        const {phone,otp}=req.body;
        if(!phone || !otp)  throw new AppError("phone number and otp is required",400);
        
        await otpService.verifyOtp(phone,otp);
        const data=JSON.parse(await redis.get(`user:${phone}`))
        //console.log(data)
        const user=await prisma.user.create({data:{phone:data.phone,name:data.name,age:data.age,gender:data.gender}})

        const d={id:user.id,phone:user.phone}
        const Refresh_token=await jwtService.generateRefreshToken(d)
        const Access_token=await jwtService.generateAccessToken(d)
        res.cookie("refersh_token",Refresh_token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
             sameSite:  process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie("access_token",Access_token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
             sameSite:  process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
            maxAge: 15*60*1000 // 7 days
        });

        return res.status(200).json({success:true,message:"Account created successfully"})
})