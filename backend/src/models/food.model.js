import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },

    video : {
        type:String,
        require : true
    },

    description : {
        type:String
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    },
},{
    timestamps : true
})

const foodModel = mongoose.model("foodModel",foodSchema);

export default foodModel;