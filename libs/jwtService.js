import jwt from "jsonwebtoken"

export const jwtService={
    generateRefreshToken:async(data)=>{
        const token =await jwt.sign(data,process.env.JWT_SECRET,{
    expiresIn: "7d"
    });
        return token;
    },
    verifyRefreshToken :async(token)=>{
        //console.log(token)
        const decode =await jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decode)
        return decode;
    },
    generateAccessToken:async(data)=>{
       //console.log(data)
        const token =await jwt.sign(data,process.env.ACCESS_SECRET,{
    expiresIn: "15m"
    });
     
        return token;
    },
    verifyAccessToken :async(token)=>{
        //console.log(token)
        const decode =await jwt.verify(token,process.env.ACCESS_SECRET);
        return decode;
    }
}