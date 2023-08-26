
const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/usermodel");
const router=express.Router();

//create
router.post("/",async (req,res)=>{
    const {name,email,age}=req.body;
    try {
        const userAdded=await User.create({
            name:name,
            email:email,
            age:age
        });

        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
});


//get
router.get("/all",async (req,res)=>{
   
    try {
        const allData=await User.find();

        res.status(200).json(allData);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }

});

//getSingleUser
router.get("/:id",async (req,res)=>{
    const {id}=req.params;
   
    try {
        const singleUserData=await User.findById({_id:id});

        res.status(200).json(singleUserData);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }

});

//delete

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
   
    try {
        const deleteUserData=await User.findByIdAndDelete({_id:id});

        res.status(200).json(deleteUserData);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }

});

//put/patch

router.patch("/:id",async (req,res)=>{
    const {id}=req.params;
    const {name,email,age}=req.body;

   
    try {
        const updateUserData=await User.findByIdAndUpdate(id,req.body,{new:true});

        res.status(200).json(updateUserData);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }

});

module.exports=router;

