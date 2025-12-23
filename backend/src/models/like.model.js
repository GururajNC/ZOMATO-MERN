import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.ObjectId,
        ref : 'user',
        require:true
    },
    food :{
        type : mongoose.Schema.ObjectId,
        ref: 'food',
        require:true
    },
    
},{
    timestamps :true
});

const Like = mongoose.model("like",likeSchema)
export default Like