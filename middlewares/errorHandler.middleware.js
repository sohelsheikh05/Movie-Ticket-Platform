

export const handleError=(err,req,res,next)=>{
    //console.log(err)
    return res.status(err.statusCode).json({success:false,message:err.message});
}

export const catchAsync = (fn) => {
    return (req,res,next)=>{
        Promise.resolve(
            fn(req,res,next)
        ).catch(next);
    };
};