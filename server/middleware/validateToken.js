const admin = require("../firebase/firebase.config");

async function decodeToken(req,res,next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if(decodedToken)
            return next();
        
        return res.status(401).json({
            message:"Unauthorized"
        });

    } catch(e) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


module.exports = decodeToken;