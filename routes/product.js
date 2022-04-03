const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const Product = require("../models/productModel");

// Add Product
router.post('/', verifyTokenAndAdmin, async (req, res) => {

    const nweProduct = new Product(req.body);

    try {
        const savedProduct = await nweProduct.save();
        res.status(201).json(savedProduct);


    } catch (err) {
        res.status(500).json({ message: err.message })
    };
}
)

// Update Product

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ staus: 500, message: err.message })
    }
})

// Delete Product

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 200, message: "Product Deleted" });
    } catch (err) {
        res.status(500).json({ staus: 500, message: err.message })
    }
})

// Getproduct

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({ status: 200, data: product })

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
})


// Get All Products
router.get('/', async (req, res) => {
    const qnew = req.query.new;
    const qcategory = req.query.category;

    try {
        let products;

        if (qnew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(2);

        } else if (qcategory) {
            products = await Product.find({ categories: { $in: [qcategory], }, });
        }else{
            products = await Product.find();
        }

        res.status(200).json({ status: 200, count:products.length, data: products })

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
});


module.exports = router;