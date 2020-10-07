const express = require('express');
const productController = require('./product.controller');

const router = express.Router();

router.post('/', productController.insertProduct);
router.get('/byId/:id', productController.getProductById);
router.get('/list', productController.getProductList);

module.exports = router;