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
    likeCount :{
        type:Number,
        default : 0
    },
    saveCount :{
        type:Number,
        default :0
    }
},{
    timestamps : true
})

const foodModel = mongoose.model("food",foodSchema);

export default foodModel;