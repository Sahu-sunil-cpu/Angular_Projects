
const Product = require('../models/Product');

// GET /api/products
async function getProducts(req, res, next) {
    try {
        const category = 'All'
        const filter = {};

        filter.category = category;




        let query = Product.find(filter);

        const products = await query;

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
}

// GET /api/products/:id
async function getProductById(req, res, next) {
    try {
        if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID.'
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProducts,
    getProductById
};
