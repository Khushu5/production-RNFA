const express=require("express");
const cors=require('cors');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const connectDB = require("./config/db");

//dotenv koh config kerna padhta h
dotenv.config()


//MongoDb connection
connectDB();

//rest object banayegae

const app= express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//Routes
app.use('/api/v1/auth',require("./routes/userRoutes"));
app.use('/api/v1/post',require("./routes/postRoute"))

//home
app.get('/',(req,res)=>{
    res.status(200).send({
        success:true,
        message:"Node Server running"
    })
})

//Port
const PORT= process.env.PORT || 8080


// to run the server we have to listen 

app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`.bgGreen.white);
})
