module.exports = {
    async Register(req, res) {
        try {
            const isPresent = await models.User.findOne({
                where: {
                    username: req.body.username,
                    user_type: req.body.user_type
                },
                raw: true
            })
            if (isPresent)
                res.send({ code: 400, message: 'User already exists' });

            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) throw err;
                const createUser = await models.User.create({
                    username: req.body.username,
                    password: hash,
                    user_type: req.body.user_type
                });
                res.send({ code: 201, createUser });
            });
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    },
   async Login(req, res) {
        try {
            const isPresent = await models.User.findOne({
                where: {
                    username: req.body.username,
                    user_type: req.body.user_type
                },
                raw: true
            })
            if (!isPresent)
                res.send({ code: 400, message: 'User not found' });

            bcrypt.compare(req.body.password, isPresent.password, function (err, result) {
                if (result == true) {
                    const token = jwt.sign({ isPresent }, process.env.SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    res.send({ code: 200, token });
                }
                else {
                    res.send({ code: 400, message: 'Password is incorrect' });
                }
            });
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    }
}