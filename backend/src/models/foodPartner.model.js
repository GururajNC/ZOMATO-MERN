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
    phone : {
        type: String,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    password:{
        type: String
    }
},{
    timestamps : true
})

const foodPartnerModel = mongoose.model("foodPartner",foodPartner);

export default foodPartnerModel