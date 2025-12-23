import mongoose from "mongoose";

const saveFoodSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.ObjectId,
        ref : 'user',
        require : true
    },
    food : {
        type : mongoose.Schema.ObjectId,
        ref : 'food',
        require : true
    }
},{
    timestamps : true
});

const saveModel = mongoose.model('saveFood',saveFoodSchema);

export default saveModel