
async function error(error,req,res,next){
    
    res.status(error.status).json({
        error:error.message
    });
}

module.exports = error;