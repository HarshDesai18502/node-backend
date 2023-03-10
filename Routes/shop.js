const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/',shopController.getIndexPage);

router.get('/products',shopController.getProducts);

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.get('/products/:productId',shopController.getProduct);

module.exports = router;