

export const handleError=(err,req,res,next)=>{
    //console.log(err)
        //console.error(err);
    if (err.code === "P2002") {
        return res.status(409).json({
            success: false,
            message: "Movie with language already exists"
        });
    }
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}

export const catchAsync = (fn) => {
    return (req,res,next)=>{
        Promise.resolve(
            fn(req,res,next)
        ).catch(next);
    };
};