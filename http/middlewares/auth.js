const jwt = require('jsonwebtoken');
module.exports = {
    AuthMiddleware: (req, res, next) => {
        if (req.path == "/api/auth/login" || req.path == "/api/auth/register") {
            next();
        }
        else {
            jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                req.userData = decoded;
                next();
            })
        }
    }
}