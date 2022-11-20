const express = require('express');
const dotenv = require('dotenv')
const models = require('./models')
const bodyParser = require('body-parser')
const AuthRoutes = require('./Routes/AuthRoutes.js');
const BuyerRoutes = require('./Routes/BuyerRoutes.js');
const SellerRoutes = require('./Routes/SellerRoutes.js');
dotenv.config({ path: '.env' });
const app = express()
const authMiddleWare = require('./http/middlewares/auth');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

models.sequelize
    .sync()
    .then((result, err) => {
        if (err) throw err
        console.log('Database connected')
    })
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

/**
 * Adding headers to our requests.
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

// application level middleware
app.use(authMiddleWare.AuthMiddleware);

app.use("/api/auth", AuthRoutes);
app.use("/api/buyer", BuyerRoutes);
app.use("/api/seller", SellerRoutes);


app.listen(app.get('port'), () => {
    console.log(
        '%s App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
});



module.exports = app;

