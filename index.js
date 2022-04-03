const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const main = require("./routes/main");

dotenv.config()
 
const { model } = require("mongoose");
  mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
       console.log('Db connection successfull')
    }
).catch( (err)=> console.log(err))

app.use(express.json())
//for json req from frdend
app.use('/', main);
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/order', orderRoute);


app.listen(process.env.PORT || 5001, ()=>{
    console.log('Server started')
})



// adminlogin
// malara
// 123123