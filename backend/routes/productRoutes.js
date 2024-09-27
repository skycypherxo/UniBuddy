const express = require('express');
const router = express.Router();
const { buyProduct , contactSeller ,getProducts , createProduct } = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');


router.post('/create', authenticate, createProduct);
router.get('/get', getProducts);

router.get('/buy/:productId', authenticate, buyProduct); 
router.get('/contact/:productId',authenticate, contactSeller);

module.exports = router;
