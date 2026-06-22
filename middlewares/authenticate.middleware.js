import { AppError } from "../libs/Error.js";
import { jwtService } from "../libs/jwtService.js";
export const authenticate=async(req,res,next)=>{
    try{
        const access_token=req.cookies.access_token;
        if(!access_token){
                
        }
        const data=await jwtService.verifyAccessToken(access_token);
        req.user=data;
        return next();
        
    }
    catch(err){
        // console.log(err.message=="jwt must be provided")
        if(err.name==="JsonWebTokenError"){
            try{
                 const refreshToken =
                req.cookies.refresh_token;

                if (!refreshToken) {
                    return next(
                        new AppError(
                            "Session Expired",
                            401
                        )
                    );
                }
                const data=await jwtService.verifyRefreshToken(refreshToken);
                const access_token=await jwtService.generateAccessToken(data);
                res.cookie("access_token",access_token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 15*60*1000 // 7 days
                });
                req.user=data
                return next();
            }
            catch(err){

                throw new AppError("Session Expired PLz login",401);
            }

            next();
        }
        
        throw new AppError(err.message,400);
    }
}