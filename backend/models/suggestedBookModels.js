const mongoose = require('mongoose');

const suggestedBookSchema = new mongoose.Schema({
    title : String,
    author : String,
    name : String,
    email : String,
    notes : String,
    status :  {
        type : String,
        enum : ['pending','rejected','accepted'],
        default : 'pending'
    },
    date : {type: Date, default:Date.now}
});

module.exports=mongoose.model("suggestedbook",suggestedBookSchema);