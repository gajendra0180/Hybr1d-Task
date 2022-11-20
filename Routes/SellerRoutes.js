const express = require("express");
const SellerControllers = require("../http/controllers/SellerControllers");
const router = express.Router();

router.get('/orders', async (req, res) => {
    SellerControllers.getOrders(req, res);
})

router.post('/create-catalog', async (req, res) => {
    SellerControllers.createCatalog(req, res);
})

router.post('/add-product', async (req, res) => {
    return SellerControllers.addProduct(req, res);
})

module.exports = router;