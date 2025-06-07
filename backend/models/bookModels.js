const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : String,
    author : String,
    year : Number,
    genre : String,
    img : String,
    isbn : {type : Number, unique : true}
});

module.exports = mongoose.model("book",bookSchema);