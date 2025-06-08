const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectdb = require('./db/connectdb');
const bookRoutes = require('./routes/bookRoutes');
const suggestedBookRoutes = require('./routes/suggestedBookRoutes');
const genreRoutes = require('./routes/genreRoutes');
const authRoutes = require ('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/books',bookRoutes);
app.use('/api/suggestedbooks',suggestedBookRoutes);
app.use('/api/genres',genreRoutes);
app.use('/api/auth',authRoutes);
app.use('/api',userRoutes);

app.listen(PORT,()=>{
    connectdb();
    console.log(`Server is running on  port ${PORT}`);
});