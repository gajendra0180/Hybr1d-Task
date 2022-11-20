const BaseModel = require("./BaseModel");

class Order extends BaseModel {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                uuid: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                },
                buyer_id: {
                    type: DataTypes.TEXT,
                    defaultValue: null,
                },
                seller_id: {
                    type: DataTypes.DOUBLE,
                    defaultValue: null,
                },
                price: {
                    type: DataTypes.DOUBLE,
                    defaultValue: null,
                }
            },
            {
                modelName: "OrderItem",
                tableName: "order_item",
                underscored: true,
                sequelize,
            }
        );
    }
}

module.exports = Order;
