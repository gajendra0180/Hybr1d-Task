const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const env = process.env || 'development'
const ProductModel = require('./Product');
const UserModel = require('./User');
const OrderModel = require('./Order');
const OrderItemModel = require('./OrderItem');
const CatalogModel = require('./Catalog');

const sequelize = new Sequelize(
    env.DB_DATABASE,
    env.DB_USERNAME,
    '123456aA#',
    {
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: env.DB_CONNECTION,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: env.ENVIRONMENT == 'dev' ? false : false,
    }
)

const db = {
    Product: ProductModel.init(sequelize, Sequelize),
    User: UserModel.init(sequelize, Sequelize),
    Order: OrderModel.init(sequelize, Sequelize),
    OrderItem: OrderItemModel.init(sequelize, Sequelize),
    Catalog: CatalogModel.init(sequelize, Sequelize),
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
