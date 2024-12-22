const express = require('express')
const app = express();
const port = 9000;
const authrouter= require('./routes/auth')
const cors = require('cors')
const cookieparser= require('cookie-parser')
const mongoose = require('mongoose')



app.listen(port,() => {
    console.log(
        `server is running on port ${port}...`
    )
})