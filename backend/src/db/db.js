import mongoose from "mongoose"

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("mongodb connected")
    })
    .catch((err)=>{
        console.log("mongoDB err",err)
    })
};

export default connectDB;