const router = require('express').Router()

router.get('/usertest',  (req, res)=>{
    res.send("user test is succesfull")
} )

router.post('/userposttest', (req,res)=>{
    const username = req.body.username;
    console.log(username)
    res.send("Your userName is " + username) 
})


module.exports = router

// http://localhost:5000/api/v1/user/usertest