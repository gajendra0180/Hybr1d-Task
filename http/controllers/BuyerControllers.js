const { User } = require('../../models');
const models = require('../../models')

module.exports = {
    async GetSellers(req, res) {
        try {
            const sellers = await models.User.findAll({
                where: {
                    user_type: 'seller'
                },
                raw: true,
                attributes: ['username', 'user_type']
            })
            res.send({ code: 200, sellers });
        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    },
    async getCatalog(req, res) {
        try {
            // accepts the seller uuid
            let seller_id = await User.findOne({
                where: {
                    uuid: req.params.seller_id,
                    user_type: 'seller'
                },
                attributes: ['id'],
                raw: true
            })
            seller_id = seller_id.id;
            if (seller_id) {
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
            else {
                res.send({ code: 500, message: "Seller Does not exists" })
            }

        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    },
    async createOrder(req, res) {
        try {
            // Accpeta a seller uuid and a list of products with the uuid of the catalog table
            let seller_id = await User.findOne({
                where: {
                    uuid: req.params.seller_id,
                    user_type: 'seller'
                },
                attributes: ['id'],
                raw: true
            })
            console.log(seller_id)
            seller_id = seller_id.id;
            if (seller_id) {
                const buyer_user_uuid = req.body.buyer;
                // Items will be the uuid column of the catalog table for the products of seller with the current seller id
                const items = req.body.items;
                console.log(items)
                const catalog_products = await models.Catalog.findAll({
                    where: {
                        uuid: items
                    },
                    raw: true
                })
                const products = await models.Product.findAll({
                    where: {
                        id: catalog_products.map((item) => item.product_id)
                    },
                    raw: true
                })
                let total_price = 0;
                products.map((product) => {
                    total_price += product.price
                })

                models.User.findOne({
                    where: {
                        uuid: buyer_user_uuid,
                        user_type: 'buyer'
                    },
                    raw: true
                }).then(async (buyer) => {

                    try {
                        if (buyer) {
                            console.log(buyer.id, seller_id, total_price)
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
                    }
                    catch (err) {
                        res.send({ code: 500, message: err.message })
                    }
                })
            }
            else {
                res.send({ code: 500, message: "Seller Does not exists" })
            }

        }
        catch (err) {
            res.send({ code: 500, message: err.message })
        }
    }

}