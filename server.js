const movieController = require('./controller/movieController.js')
const usersController = require('./controller/usersController.js')
const {db} = require('./db/movies-seed')
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')


const app = express();

if(process.env.NODE_ENV!="production")
{
    require("dotenv").config({path:"config/Keys.env"})
}

app.use(express.json());

app.use(fileUpload());



app.use(cors({
    origin:process.env.FRONT_END
}))

app.use("/movie",movieController)
app.use("/users",usersController)

const PORT = process.env.PORT;

app.listen(PORT,()=>{

    console.log(`Application is running on port ${PORT}`)
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('your in')
        //db();
    })
    .catch(err=>{
        console.log('you failed'+err)
    })

})