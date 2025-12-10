import  jwt  from "jsonwebtoken";
import userModel from "../models/user.model.js"
import foodPartnerModel from "../models/foodPartner.model.js";

async function authFoodPartnerMiddleware(req, res, next){

    const token = req.cookies.token;

    if (!token){
        res.status(401).json({
            message : "please login first"
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const foodPartner = await foodPartnerModel.findById(decode.id);

        req.foodPartner = foodPartner;

        next();
        
    } catch (error) {
        res.status(401).json({
            message : "INVALID TOKEN "
        })
    }
    
    
}

async function authUserMiddleware(req,res,next){
    const token=req.cookies.token;

    if(!token){
        res.status(500).json({
            message:'user not found'
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const user= await userModel.findById(decode.id);

        req.user=user;

        next();

    } catch (error) {

        res.status(401).json({
            message : "invalid token"
        })
        
    }
}


export default {
    authFoodPartnerMiddleware,
    authUserMiddleware
}