import foodPartnerModel from "../models/foodPartner.model.js";



async function getFoodPatnerById(req,res){

    const getPartner = req.params.id
    console.log(getPartner);

    const profile= await foodPartnerModel.findById(getPartner);

    if(!profile){
        return res.status(404).json({
            message:"food partner not found"
        })
    }
    res.status(200).json({
        message:" profile extracted",
        profile
    })
}

export default {
    getFoodPatnerById
}
