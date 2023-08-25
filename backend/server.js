const express=require("express");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
app.use(express.json());
const userRoute=require("./routes/userRoutes");
const cors=require("cors");

app.use(cors(
    {
        origin:["https://mern-app-frontend-vert.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
));


mongoose.connect("mongodb+srv://"+process.env.URI+"@cluster0.iewubng.mongodb.net/mernDB").
then(()=>{
    console.log("Connected to db successfully");
    app.listen(process.env.PORT || 8000,(err)=>{
        if(err){
            console.log(err);
        }
        console.log("Running successfully at port",process.env.PORT);
    });
}).catch((err)=>{
    console.log("error:",err);
});
app.use("/",(req,res)=>{
    res.send("Server is running.");
})
app.use(userRoute);


