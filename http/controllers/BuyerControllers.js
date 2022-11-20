module.exports = {
    async GetSellers(req, res) {
        try {
            const sellers = await models.User.findAll({
                where: {
                    user_type: 'seller'
                },
                raw: true
            })
            res.send({ code: 200, sellers });
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    },
    async getCatalog(req, res) {
        try {
            const seller_id = req.params.seller_id;
            const catalog = await models.Catalog.findAll({
                where: {
                    seller_id: seller_id
                },
                raw: true
            })
            const productList = await models.Product.findAll({
                where: {
                    id: catalog.map((item) => item.product_id)
                },
                raw: true
            })
            res.send({ code: 200, productList });
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    },
    async createOrder(req, res) {
        try {
            const seller_id = req.params.seller_id;
            const buyer_user_name = req.body.user_name;
            // Items will be the array of uuid column of the catalog table
            const items = req.body.items;
            const products = await Product.findAll({
                where: {
                    uuid: items.map((item) => item.uuid)
                },
                raw: true
            })
            let total_price = 0;
            products.map((product) => {
                total_price += product.price
            })
            models.User.findOne({
                where: {
                    username: buyer_user_name,
                    user_type: 'buyer'
                },
                raw: true
            }).then(async (buyer) => {
                if (buyer) {
                    const order = await models.Order.create({
                        buyer_id: buyer.id,
                        seller_id: seller_id,
                        price: total_price
                    })
                    products.forEach(async (item) => {
                        await models.OrderItem.create({
                            order_id: order.id,
                            product_id: item.id
                        })
                    })
                    res.send({ code: 200, message: 'Order created' });
                }
                else {
                    res.send({ code: 400, message: 'Buyer not found' });
                }
            })
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    }

}