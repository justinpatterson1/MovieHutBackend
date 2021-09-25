const express = require('express');
const mongoose = require('mongoose')
const movieController = require('./controller/movieController.js')
const app = express();

if(process.env.NODE_ENV!="production")
{
    require("dotenv").config({path:"config/Keys.env"})
}

app.use(express.json());

app.use("/movie",movieController)

const PORT = process.env.PORT;

app.listen(PORT,()=>{

    console.log(`Application is running on port ${PORT}`)
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('your in')
    })
    .catch(err=>{
        console.log('you failed'+err)
    })

})