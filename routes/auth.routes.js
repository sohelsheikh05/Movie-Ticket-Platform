import express from "express";
import {signup,verifySignup} from "../services/signup.service.js"
import {login,verifyLogin} from "../services/login.service.js"
import { jwtService } from "../libs/jwtService.js";
import { AppError } from "../libs/Error.js";
import {authenticate} from "../middlewares/authenticate.middleware.js"
const router=express.Router();


router.post("/signup",signup);

router.post("/signup/otp",verifySignup);

router.post("/login",login);
router.get("/token",(req,res)=>{
    console.log(req.cookies)
    return res.status(200).json({})
})
router.post("/login/otp",verifyLogin);
router.get("/testing",(req,res)=>{  
    
    res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    
    });
    return res.status(200).json({message:`Handled by port ${req.socket.localPort}`})
})
router.get("/verify",authenticate,async(req,res)=>{  
    try{
    console.log("authentication done")
    await jwtService.verifyRefreshToken(req.cookies.refresh_token);
    return res.status(200).json({message:`Handled by port ${req.socket.localPort}`})
    }
    catch(err){
       throw new AppError(err,400);
    }
})
export default router;