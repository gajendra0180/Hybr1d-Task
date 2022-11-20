const express = require("express");
const BuyerControllers = require("../http/controllers/BuyerControllers");
const router = express.Router();

router.get('/list-of-sellers', async (req, res) => {
    BuyerControllers.GetSellers(req, res);
})

router.get('/seller-catalog/:seller_id', async (req, res) => {
    BuyerControllers.getCatalog(req, res);
})

router.post('/create-order/:seller_id', async (req, res) => {
    BuyerControllers.createOrder(req, res);
})


module.exports = router;