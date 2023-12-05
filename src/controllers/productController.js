// /controllers/productController.js
const Product = require('../models/productModel');

const productController = {
  getAllProducts: (req, res) => {
    Product.getAllProducts((err, results) => {
      if (err) {
        console.error('Error getting products: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  },
  getProductById: (req, res) => {
    const productId = req.params.id;
    Product.getProductById(productId, (err, result) => {
      if (err) {
        console.error('Error getting product by ID: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  },
  createProduct: (req, res) => {
    const newProduct = req.body;
    Product.createProduct(newProduct, (err, result) => {
      if (err) {
        console.error('Error creating product: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Product created successfully', id: result.insertId });
      }
    });
  },
  updateProduct: (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    Product.updateProduct(productId, updatedProduct, (err) => {
      if (err) {
        console.error('Error updating product: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Product updated successfully' });
      }
    });
  },
  deleteProduct: (req, res) => {
    const productId = req.params.id;
    Product.deleteProduct(productId, (err) => {
      if (err) {
        console.error('Error deleting product: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    });
  }
};

module.exports = productController;
