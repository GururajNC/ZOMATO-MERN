// food.control

import storageService from "../services/file.storage.service.js";
import foodModel from "../models/food.model.js";
import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodPartner.model.js";
import likeModel from "../models/like.model.js";
import saveModel from "../models/save.model.js";

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

async function likeFood(req,res){

    const {foodId} = req.body;
    const user = req.user;

    const alreadyExist = await likeModel.findOne({
        user : user._id,
        food : foodId
    });

    if (alreadyExist) {
        await likeModel.deleteOne({
            user : user._id,
            food : foodId
        })

        await likeFood.findByIdAndUpdate(foodId,{
            inc$ : {likeCount: -1}
        })

        return res.status(200).json({
            message : "unliked successfull"
        })
    }

    const like = await foodModel.create({
        user : user._id,
        food : foodId
    })
    await likeModel.findByIdAndUpdate(findId,{
        inc$ : {likeCount: 1}
    })

    return res.status(201).json({
        like
    })

}

async function saveFood(res,req){
    const user = req.user;
    const foodId = req.body;

    const alreadyExist = await saveModel.findOne({
        user : user._id,
        food : foodId
    });

    if(alreadyExist){
        await saveModel.deleteOne({
            user :user._id,
            food:foodId
        })

        await foodModel.findIdByAndUpdate(foodId,{
            inc$ : {saveCount : -1}
        })
        
        return res.status(200).json({
            message : "removed from save"
        })
    }

    const SaveFood = await saveModel.create({
        user : user._id,
        food : foodId
    })

    await foodModel.findIdByAndUpdate(foodId,{
            inc$ : {saveCount : 1}
    })

    

    return res.status(201).json({
        SaveFood
    })

}



export default{
    createFood,
    getFood,
    likeFood,
    saveFood
    
}
