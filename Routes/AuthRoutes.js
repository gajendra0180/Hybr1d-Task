const express = require("express");
const AuthController = require("../http/controllers/AuthControllers");
const router = express.Router();

router.post('/login', async (req, res) => {
    AuthController.Login(req, res);
})

router.post('/register', async (req, res) => {
    AuthController.Register(req, res);
})

module.exports = router;