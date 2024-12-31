const express = require('express')
const app = express();
const port = 9000;
const mongoose = require('mongoose')
require('dotenv').config();
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(cookieparser())
const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('db is connected...');
    } catch (error) {
        console.error(error);
    }
}
connection();
app.listen(port,() => {
    console.log(`server is running on port ${port}...`);
})