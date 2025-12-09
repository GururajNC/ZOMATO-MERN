import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import foodPartnerModel from "../models/foodPartner.model.js";

async function registerUser(req,res){

    try {

        const {fullName,email,password} = req.body;
        const checkUser = await userModel.findOne({email});

        if(checkUser){
            return res.status(400).json({
            message : "user already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await userModel.create({
            fullName,
            email,
            password : hashedPassword
        })
        
        const token = jwt.sign({
            id: user._id
        },process.env.JWT_TOKEN);

        res.cookie("token",token);

        res.status(201).json({
            message:"user registered",
            user :{
                id:user._id,
                name:user.fullName,
                email:user.email
            }
        })
        
            
    } catch (error) {
            console.log("error in auth");  
    }
   
}

async function loginUser(req,res){
    const {email,password} = req.body;

    const user  = await userModel.findOne({
        email
    })

    if(!user){
        res.status(400).json({
            message:"user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        res.status(400).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_TOKEN)

    res.cookie("token",token);

    res.status(200).json({
        message:"user logged in successfully",
        user :{
            id : user._id,
            name : user.fullName,
            email : user.email,
            // password : user.password
        }
    })
}

async function logoutUser(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"user successfully logged out"
    })
}

async function foodPartnerRegister(req,res){

    const {name,email,password} = req.body;

    const checkFoodPartner = await foodPartnerModel.findOne({
        email
    })

    if(checkFoodPartner){
        res.status(400).json({
            message:"Food Partner account found"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password : hashedPassword
    })

    const token = jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_TOKEN);

    res.cookie("token",token);

    res.status(200).json({
        message:"food partner account has been created",
        foodPartner : {
            name : foodPartner.name,
            email: foodPartner.email
        }
    })

}

async function foodPartnerLogin(req,res){
    const {name , email,password} =req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        res.status(400).json({
            message:"food partner account not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,foodPartner.password);

    if(!isPasswordValid){
        res.status(400).json({
            message:"invalid password"
        })
    }
    
    const token = jwt.sign({
        id:foodPartner._id
    },process.env.JWT_TOKEN);

    res.cookie("token",token);

    res.status(200).json({
        message:"food partner account log in successfull",
        foodPartner : {
            id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email
        }
    })

}

async function foodPartnerLogout(req,res){
    
    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out successfully"
    })

}

export default {
    registerUser,
    loginUser,
    logoutUser,
    foodPartnerRegister,
    foodPartnerLogin,
    foodPartnerLogout
}