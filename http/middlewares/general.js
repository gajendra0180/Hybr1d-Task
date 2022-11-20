
module.exports = function (app) {
    // CORS Fix
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS, PATCH");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-FCM-Token, X-Device-ID ,Content-Type, Accept, Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Refresh-Authorization");
        next();
    });
}
