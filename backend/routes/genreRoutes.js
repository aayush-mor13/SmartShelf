const express = require('express');
const router = express.Router();
const genreModel = require('../models/genreModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// To get all genres
router.get('/genres', async (req,res)=>{
    try{
        const genres = await genreModel.find();
        return res.send(genres);
    }  
    catch(err){
        console.error(`Error fetching genres :${err}`);
        return res.status(500).json({ message: 'An error occurred while fetching genres' });
    }
})

// To delete genres
router.delete('/genres/:id', verifyToken, authorizeRole("admin"), async(req,res)=>{
    try{
        const {id} = req.params;
        const deleted = await genreModel.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({message :"Genre not found !"});
        }
        return res.status(200).json({message : "Genre deleted successfully !"});
    }
    catch(err){
        console.error("Error deleting genre :",err);
        return res.status(500).json({message : 'An error occured while deleting '})
    }
})

// To post genres
router.post('/genres', verifyToken, authorizeRole("admin"), async (req,res)=>{
    try{
        const {genre} = req.body;
        const newgenre = new genreModel({genre});
        await genreModel.create(newgenre);
        return res.status(201).json(newgenre);
    }
    catch(err){
        console.error(`Error in posting genre: ${err}`);
        return res.status(500).json({ message: 'An error occurred while posting genre' });
    }
})

module.exports = router;