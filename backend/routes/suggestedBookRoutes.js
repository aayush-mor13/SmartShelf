const express = require('express');
const router = express.Router();
const SuggestedBookModel = require('../models/suggestedBookModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');


// For suggestions
router.post('/', async (req,res)=>{
    try{
        const {title,author,name,email,notes} = req.body;
        const suggestedBook = await SuggestedBookModel.create({title,author,name,email,notes});
        console.log("Creating suggested book:", suggestedBook);
        return res.status(201).json(suggestedBook);
    }
    catch(err){
        console.error(`Error in posting the book details: ${err}`);
        return res.status(500).json({ message: 'An error occurred while posting the book details' });
    }
});

// To get the books based on status
router.get('/:status',verifyToken, authorizeRole("admin"),async (req,res)=>{
    try{
        const {status} = req.params;
        const allowedStatus = ['pending','rejected','accepted'];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Invalid status parameter !"});
        }
        const books = await SuggestedBookModel.find({status});
        return res.send(books);
    }
    catch(error){
        console.error(`Error fetching books: ${error}`);
        return res.status(500).json({ message: 'An error occurred while fetching books' });
    }
});

// to delete books
router.delete('/:id',verifyToken, authorizeRole("admin"),async (req,res)=>{
    try{
        const {id} = req.params;
        const deleted = await SuggestedBookModel.findByIdAndDelete(id);
        if(deleted){
            return res.status(200).json({message : "Suggestion Successfully deleted !"});
        }
        else {
            return res.status(404).json({ message: "Suggestion not found!" });
        }
    }
    catch(error){
        console.error(`Error deleting book: ${error}`);
        return res.status(500).json({ message: 'An error occurred while deleting suggestion !' });
    }
});

// To update status
router.put('/:id',verifyToken, authorizeRole("admin"),async (req,res)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const allowedStatus = ['pending','rejected','accepted'];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Invalid status parameter !"});
        }
        const updatedBook = await SuggestedBookModel.findByIdAndUpdate(id,{status},{new : true});
        return res.send(updatedBook);
    }
    catch(error){
        console.error(`Error updating book: ${error}`);
        return res.status(500).json({ message: 'An error occurred while updating book status !' });
    }
});

// To get all the books
router.get('/',verifyToken, authorizeRole("admin","user"),async (req,res)=>{
    try{
        const books = await SuggestedBookModel.find();
        return res.send(books);
    }
    catch(error){
        console.error(`Error fetching books: ${error}`);
        return res.status(500).json({ message: 'An error occurred while fetching books' });
    }
});

// To get all the books
router.get('/user/:username',verifyToken, authorizeRole("user"), async (req,res)=>{
    try{
        const {username} = req.params;
        const books = await SuggestedBookModel.find({name : username});
        return res.send(books);
    }
    catch(error){
        console.error(`Error fetching books: ${error}`);
        return res.status(500).json({ message: 'An error occurred while fetching books' });
    }
});

module.exports = router;