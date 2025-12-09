import express from "express"
import cookies from "cookie-parser"
import connectDB from "./db/db.js";
import router from "./routes/auth.router.js";
import foodRouter from "./routes/food.router.js";
import dotenv from "dotenv"
dotenv.config();



const app = express();
connectDB();
app.use(express.json());
app.use(cookies());
// This is the default and can be omitted
   

app.get("/",(req,res)=>{
    res.send("hello world");
})



app.use("/api/auth",router);
app.use("/api/food",foodRouter)


export default app;