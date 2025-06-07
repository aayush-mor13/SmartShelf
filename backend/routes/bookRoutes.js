const express = require('express');
const router = express.Router();
const bookModel = require('../models/bookModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// To get all the books
router.get('/books', async (req,res)=>{
    try{
        const books = await bookModel.find();
        return res.send(books);
    }
    catch(error){
        console.error(`Error fetching books: ${error}`);
        return res.status(500).json({ message: 'An error occurred while fetching books' });
    }
});

//To get book of a title
router.get('/books/title/:title',async(req,res)=>{
    try{
        const newTitle = req.params.title;
        const book = await bookModel.find({title : { $regex: new RegExp(`^${newTitle}$`, 'i') }});
        return res.send(book);
    }
    catch(err){
        console.error(`Error fetching the book : ${err}`);
        return res.status(500).json({message : 'An error occured while fetching book'});
    }
});

//To get books of a genre
router.get('/books/genre/:genre', async (req,res)=>{
    try{
        const genre = req.params.genre;
        const newbooks = await bookModel.find({genre : genre});
        
        return res.send(newbooks);
    }
    catch(error){
        console.error(`Error fetching books : ${error}`);
        return res.status(500).json({message : 'An error occured while fetching books'});
    }
});

// To post a book
router.post('/books', verifyToken, authorizeRole("admin") , async (req,res)=>{
    try{
        const {title, author, year, genre, img, isbn} = req.body;
        const newBook = new bookModel({title, author, year, genre, img, isbn});
        await bookModel.create(newBook);

        return res.status(201).json(newBook);
    }
    catch(error){
        console.error(`Error in posting the book details: ${error}`);
        if(error.code === 11000){
            return res.status(400).json({message : 'E11000 duplicate key error'});
        }
        return res.status(500).json({ message: 'An error occurred while posting the book details' });
    }
});

//TO update details
router.put('/books/:isbn',verifyToken, authorizeRole("admin") ,async (req,res)=>{
    try{
        const updatedBook = await bookModel.findOneAndUpdate(
            {isbn : req.params.isbn},
            req.body,
            { new: true }
        );
        return res.json(updatedBook);
    }
    catch(error){
        console.error(`Error in updating the book details : ${error}`);
        return res.status(500).json({ message: 'An error occurred while updating the book details' });
    }
});

//To delete a book
router.delete('/books/:isbn', verifyToken, authorizeRole("admin") ,async (req,res)=>{
    try{
        const deleteIsbn = Number(req.params.isbn);
        const result = await bookModel.deleteOne({isbn : deleteIsbn});
        if(result.deletedCount === 0){
            return res.status(404).json({ message : 'No Book Found with this ISBN !'});
        }
        return res.json({message : 'Book Details deleted'});
    }
    catch(error){
        console.error(`Error deleting the book : ${error}`);

        return res.status(500).json({ message: 'An error occurred while deleting the book' });
    }
})

module.exports = router;