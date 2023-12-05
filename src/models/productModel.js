// /models/productModel.js
const db = require('../config/database');

const Product = {
  getAllProducts: (callback) => {
    db.query('SELECT * FROM productos', callback);
  },
  getProductById: (productId, callback) => {
    db.query('SELECT * FROM productos WHERE id = ?', [productId], callback);
  },
  createProduct: (newProduct, callback) => {
    db.query('INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)',
    [newProduct.nombre, newProduct.descripcion, newProduct.precio, newProduct.cantidad],
    callback);
  },
  updateProduct: (productId, updatedProduct, callback) => {
    db.query('UPDATE productos SET ? WHERE id = ?', [updatedProduct, productId], callback);
  },
  deleteProduct: (productId, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', [productId], callback);
  }
};

module.exports = Product;
