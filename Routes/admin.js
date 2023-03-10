const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');


router.post('/product',adminController.postAddProduct);



router.get('/products',adminController.getAdminProducts);

router.get('/add-product',adminController.getAddProduct);

router.post('/products/edit',adminController.getUpdateMenu);

router.post('/edit',adminController.updateProduct);

router.post('/delete',adminController.deleteProduct);

module.exports = router;