
async function error(error,req,res,next){
    
    res.status(error.status || 500).json({
        error:error.message
    });
}

module.exports = error;