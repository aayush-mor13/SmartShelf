const express = require('express');
require ('dotenv').config();
const router = express.Router();
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');
const userModel = require('../models/userModels');

// for retreiving Admin username
router.get('/admin', verifyToken, authorizeRole("admin"), async (req,res)=>{
    try{
        const admin = await userModel.findById(req.user.id);
        if(!admin){
            return res.status(404).json({message : "Admin not found !"});
        }
        return res.status(200).json({username : admin.username});
    }
    catch(err){
        console.error("Error while fetching admin details : ",err);
        return res.status(500).json({message : 'An error occured while fetching admin details !'});
    }
})

// for getting admin details
router.get('/admin/details', verifyToken, authorizeRole("admin"), async (req,res)=>{
    try{
        const admins = await userModel.find({role : 'admin'});
        return res.status(200).json(admins);
    }
    catch(err){
        console.error("Error while fetching admins : ",err);
        return res.status(500).json({message : "An error occured while fetching details !"});
    }
})

// for admin to access all user details
router.get('/users', verifyToken, authorizeRole("admin"), async (req,res)=>{
    try{
        const users = await userModel.find({role : 'user'});
        return res.status(200).json(users);
    }
    catch(err){
        console.error("Error while fetching users : ",err);
        return res.status(500).json({message : "An error occured while fetching details !"});
    }
})

// for retreiving User details
router.get('/user/details', verifyToken, authorizeRole("user"), async (req,res)=>{
    try{
        const user = await userModel.findById(req.user.id);
        if(!user){
            return res.status(404).json({message : "User not found !"});
        }
        return res.status(200).json({username : user.username, email : user.email});
    }
    catch(err){
        console.error("Error while fetching user details : ",err);
        return res.status(500).json({message : 'An error occured while fetching user details !'});
    }
})

module.exports = router;