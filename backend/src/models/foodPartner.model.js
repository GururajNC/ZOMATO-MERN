import mongoose, { Types } from "mongoose";

const foodPartner = mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email : {
        type:String,
        require: true,
        unique : true
    },
    password:{
        type: String
    }
},{
    timestamps : true
})

const foodPartnerModel = mongoose.model("foodPartner",foodPartner);

export default foodPartnerModel