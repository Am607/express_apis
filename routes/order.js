const router = require('express').Router();
const Order = require('../models/orderModel');
const { verifyTokenAndAutherization, verifyToken, verifyTokenAndAdmin } = require('./verifyToken');

//neworder
router.post('/', verifyTokenAndAutherization, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json({ status: 200, data: savedOrder })


    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
})


//getorder for user

router.get('/find/:id', verifyTokenAndAutherization, async (req, res) => {

    try {
        const order = await Order.find({userId: req.params.id});
        res.status(200).json({ status: 200, count: order.length, data: order })
    } catch (err) {
        res.status(500).json({ status: 500,  message: err.message })
    }

})

//getAllorder For admin

router.get("/List", verifyTokenAndAdmin, async (req, res) => {

    try {
        const order = await Order.find();
        res.status(200).json({ status: 200, count: order.length, data: order })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }

})

// updateOrder

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ status: 200, data: order })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
})

// deleteOrder

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 200, message: 'Order deleted successfully' });


    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }

})


// getMonthlyIncome

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMoth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMoth.getMonth() - 1));

    try {
          const income = await Order.aggregate([
              {$match: {createdAt: {$gte: previousMonth,}}},

              {$project: {
                  month: {$month: "$createdAt"},
                  sales: '$amount',
              }},
              {$group: {
                    _id: '$month',
                    total : {$sum: '$sales'},
              } }
          ])


        res.status(200).json({ status: 200, data: income })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
})




module.exports = router;