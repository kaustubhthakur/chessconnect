const express = require('express')
const app = express();
const port = 9000;
const authrouter= require('./routes/auth')
const cors = require('cors')
const cookieparser= require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config();
app.use(express.json())
app.use(cookieparser())
app.use(cors());
const connection = async()=> 
{
 try {
    await mongoose.connect(process.env.MONGODB);
    console.log('db is connected...')
 } catch (error) {
    console.error(error);
 }   
}
app.use('/auth',authrouter);
app.listen(port,() => {
    console.log(
        `server is running on port ${port}...`
    )
})