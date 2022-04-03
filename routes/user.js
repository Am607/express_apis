const router = require('express').Router()
const CryptoJS = require("crypto-js");
const User = require('../models/userModel');
const { varifyToken, verifyTokenAndAdmin, verifyTokenAndAutherization } = require('./verifyToken')

// router.get('/usertest',  (req, res)=>{
//     res.send("user test is succesfull")
// } )

// router.post('/userposttest', (req,res)=>{
//     const username = req.body.username;
//     console.log(username)
//     res.send("Your userName is " + username) 
// })

//UPDATE USER
router.put('/:id', verifyTokenAndAutherization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE USER
router.delete('/:id', verifyTokenAndAutherization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        res.status(200).json(user);

    }
    catch (err) {
        res.status(500).json(err);
    }

});

//GET USER List

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
        //TODO  TO CHECK
    }

})




module.exports = router

// http://localhost:5000/api/v1/user/usertest