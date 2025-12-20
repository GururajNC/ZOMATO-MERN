// food.control

import storageService from "../services/file.storage.service.js";
import foodModel from "../models/food.model.js";
import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodPartner.model.js";



async function createFood (req,res){

    try{

        // console.log(req.foodPartner)

        // console.log(req.body)

        // console.log(req.file)
    
        const fileUploadResult = await storageService.fileUpload(req.file.buffer)

        console.log("cloudinary result :", fileUploadResult.secure_url);

        const foodItem = await foodModel.create({
            name : req.body.name,
            video: fileUploadResult.secure_url,
            description: req.body.description,
            foodPartner: req.foodPartner._id
        })
        res.status(201).json({
            message : "item created",
           food : foodItem
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

async function getFood (req,res){
    // console.log(req.foodItem)

    const foodItems = await foodModel.find({});
    res.status(200).json({
        message:" all items found successfully",
        foodItems
    })

}

async function getFoodPatnerById(req,res){

    const getPartner = req.params.id

    const profile= await foodPartnerModel.findById(getPartner);
    res.status(200).json({
        message:" profile extracted",
        profile
    })
}

export default{
    createFood,
    getFood,
    getFoodPatnerById
}
