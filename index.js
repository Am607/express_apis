const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require("./routes/auth");

dotenv.config()
 

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log('Db connection successfull')
    }
).catch( (err)=> console.log(err))

app.use(express.json())
//for json req from frdend
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/user', userRoute)


app.listen(process.env.PORT || 5001, ()=>{
    console.log('Server started')
})
