module.exports = {
    async getOrders(req, res) {
        try {
            let orders = []
            const allOrders = await models.Order.findAll({
                raw: true
            })
            for (let i = 0; i < allOrders.length; i++) {
                const buyer = await models.User.findOne({
                    where: {
                        id: allOrders[i].buyer_id
                    },
                    raw: true
                })
                orders[i].buyer = buyer;
                const seller = await models.User.findOne({
                    where: {
                        id: allOrders[i].seller_id
                    },
                    raw: true
                })
                orders[i].seller = seller;
                const orderItems = await models.OrderItem.findAll({
                    where: {
                        order_id: allOrders[i].id
                    },
                    raw: true
                })
                const Products = await models.Product.findAll({
                    where: {
                        id: orderItems.map((item) => item.product_id)
                    },
                    raw: true
                })
                orders[i].products = Products;
            }
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    },
    async createCatalog(req, res) {
        try {
            // Items will be a list of uuids of the correspoding product
            const items = req.body.items;
            const seller_user_name = req.body.user_name;
            await models.User.findOne({
                where: {
                    username: seller_user_name,
                    user_type: 'seller'
                },
                raw: true
            }).then(async (seller) => {
                if (seller) {
                    items.forEach(async (item_uuid) => {
                        const item = await Product.findOne({
                            where: {
                                uuid: item_uuid
                            },
                            raw: true
                        })
                        if (item) {
                            await models.Catalog.create({
                                seller_id: seller.id,
                                product_id: item.id
                            })
                        }
                    })
                    res.send({ code: 200, message: 'Catalog created' });
                }
                else {
                    res.send({ code: 400, message: 'Seller not found' });
                }
            })
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    }
}