const express = require('express')
const  mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const port = 9000;
const cors = require('cors')
const cookieparser = require('cookie-parser')
const authrouter = require('./routes/auth');

app.use(express.json())
app.use(cookieparser());
app.use(cors());

const connection = async()=> 
{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('database is connected...')
    } catch (error) {
        console.error(error)
    }
}
connection();
app.use('/auth',authrouter);
app.listen(port,() => {
    console.log(`server is running on port ${port}...`)
})