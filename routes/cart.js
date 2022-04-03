

const Cart = require("../models/cartModel");

const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

//create cart
router.post('/' , verifyToken,  async (req, res)=>{
    const newcart = new Cart(req.body);
    
     try{
            const savedCart = await newcart.save();
            res.status(200).json({status: 200, data: savedCart})
            // console.log(cart)
     }catch(err){
         res.status(500).json({status:500, message: err.message})
     }
})

// getCart

router.get('/find/', verifyTokenAndAutherization, async (req, res) => {
      try{
          const cart = await Cart.findOne({userId: req.body.userId});
          res.status(200).json(cart);
      } catch(err){
          res.status(500).json({status:500, message: err.message})
      }
})

// getAllCart
router.get('/List', verifyTokenAndAdmin , async (req, res) => {
    try{
        const cart = await Cart.find();
        res.status(200).json({status:200, count:cart.length, message: cart});
    } catch(err){
        res.status(500).json({status:500, message: err.message})
    }
})

// updateCart
router.put('/:id', verifyTokenAndAutherization, async (req, res) => {
    try{
        const cart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        console.log(cart)
        res.status(200).json({status:200, message: cart});
    } catch(err){
        res.status(500).json({status:500, message: err.message})
    }
})


// deleteCart
router.delete('/:id', verifyTokenAndAutherization, async (req, res) => {
    try{
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({status:200, message: 'Cart deleted successfully'});
    } catch(err){
        res.status(500).json({status:500, message: err.message})
    }
})


module.exports = router;