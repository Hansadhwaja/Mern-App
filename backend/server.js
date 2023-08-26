const express=require("express");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
app.use(express.json());
const userRoute=require("./routes/userRoutes");
const cors=require("cors");

app.use(cors());

mongoose.connect(process.env.URI).
then(()=>{
    console.log("Connected to db successfully");
    app.listen(process.env.PORT,(err)=>{
        if(err){
            console.log(err);
        }
        console.log("Running successfully at port",process.env.PORT);
    });
}).catch((err)=>{
    console.log("error:",err);
});
app.use(userRoute);


