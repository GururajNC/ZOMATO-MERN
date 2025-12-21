import foodPartnerModel from "../models/foodPartner.model.js";
import foodModel from "../models/food.model.js";


async function getFoodPatnerById(req,res){

    const getPartner = req.params.id
    console.log(getPartner);

    const foodPartner= await foodPartnerModel.findById(getPartner);
    const foodItemsByFoodPartner = await foodModel.find({foodPartner});

    if(!foodPartner){
        return res.status(404).json({
            message:"food partner not found"
        })
    }
    // console.log(foodItemsByFoodPartner)
    res.status(200).json({
        message:" profile extracted",
        foodPartner :{
            ...foodPartner.toObject(),
            foodItems : foodItemsByFoodPartner
        }
    })
}

export default {
    getFoodPatnerById
}
