const Product = require('../models/Product');

// @desc    Fetch all products or by category
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};