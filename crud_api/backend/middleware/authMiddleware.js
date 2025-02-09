const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect =asyncHandler(async (req,res,next) => {
   
        let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Gett user from the token.(Not required password)
            req.user = await User.findById(decoded.id).select("-password");
            next();
        
    } 
    
        catch(error) {
            res.status(401);
            throw new Error("Not authorized");
        }
    }
    if(!token) {
        res.status(401);
        throw new Error("Not authorized. No token.");
    }
})




module.exports = {protect};